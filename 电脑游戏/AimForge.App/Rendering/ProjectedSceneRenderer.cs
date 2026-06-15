using System.Numerics;
using AimForge.App.UI;
using AimForge.Core.Combat;
using AimForge.Core.Input;
using AimForge.Core.Settings;
using AimForge.Core.Training;
using UiVector4 = AimForge.App.UI.Vector4;

namespace AimForge.App.Rendering;

/// <summary>
/// Draws the training scene with CPU projection + 2D overlay (same path as HUD/crosshair).
/// Avoids broken OpenGL MVP on some GPU drivers.
/// </summary>
public static class ProjectedSceneRenderer
{
    private static readonly Vector3 Eye = new(0f, 1.65f, 0f);

    private static readonly UiVector4 Sky = new(0.14f, 0.16f, 0.21f, 1f);
    private static readonly UiVector4 Floor = new(0.28f, 0.30f, 0.34f, 1f);
    private static readonly UiVector4 Wall = new(0.68f, 0.71f, 0.76f, 1f);
    private static readonly UiVector4 WallEdge = new(0.52f, 0.55f, 0.60f, 1f);
    private static readonly UiVector4 SideWall = new(0.22f, 0.24f, 0.28f, 1f);
    private static readonly UiVector4 Mark = new(0.95f, 0.78f, 0.15f, 1f);

    public static void Draw(
        OverlayRenderer overlay,
        TrainingSceneState scene,
        CameraController camera,
        AimSettings settings,
        int screenW,
        int screenH)
    {
        overlay.DrawRect(0, 0, screenW, screenH, Sky);

        var aspect = (float)screenW / screenH;
        var hFov = settings.HorizontalFov;

        if (scene.SceneKind == SceneKind.SprayWall)
        {
            DrawSprayWall(overlay, scene, camera, hFov, aspect, screenW, screenH);
        }
        else
        {
            DrawTrainingRoom(overlay, scene, camera, hFov, aspect, screenW, screenH);
        }
    }

    private static void DrawTrainingRoom(
        OverlayRenderer overlay,
        TrainingSceneState scene,
        CameraController camera,
        float hFov,
        float aspect,
        int screenW,
        int screenH)
    {
        var yaw = camera.Yaw;
        var pitch = camera.Pitch;

        overlay.DrawRect(0, 0, screenW * 0.12f, screenH, SideWall);
        overlay.DrawRect(screenW * 0.88f, 0, screenW * 0.12f, screenH, SideWall);

        if (TryProjectQuad(
                yaw, pitch, hFov, aspect, screenW, screenH,
                new Vector3(-12f, 0f, 18f), new Vector3(12f, 0f, 18f),
                new Vector3(12f, 4f, 18f), new Vector3(-12f, 4f, 18f),
                out var tl, out var tr, out var br, out var bl))
        {
            var floorY = Math.Max(tl.Y, tr.Y);
            if (floorY < screenH)
            {
                overlay.DrawRect(0, floorY, screenW, screenH - floorY, Floor);
            }

            overlay.DrawScreenQuad(tl, tr, br, bl, Wall);
            overlay.DrawRectOutline(
                Math.Min(tl.X, bl.X), Math.Min(tl.Y, tr.Y),
                Math.Max(tr.X, br.X) - Math.Min(tl.X, bl.X),
                Math.Max(bl.Y, br.Y) - Math.Min(tl.Y, tr.Y),
                3f, WallEdge);
        }
        else
        {
            overlay.DrawRect(0, screenH * 0.45f, screenW, screenH * 0.55f, Floor);
            var pw = screenW * 0.72f;
            var ph = screenH * 0.42f;
            var px = (screenW - pw) * 0.5f;
            var py = screenH * 0.12f;
            overlay.DrawRect(px, py, pw, ph, Wall);
            overlay.DrawRectOutline(px, py, pw, ph, 3f, WallEdge);
        }

        foreach (var target in scene.Targets)
        {
            if (!target.Active)
            {
                continue;
            }

            DrawBox(overlay, target.Center, target.HalfExtents,
                new UiVector4(target.Color.X, target.Color.Y, target.Color.Z, 1f),
                yaw, pitch, hFov, aspect, screenW, screenH);
        }
    }

    private static void DrawSprayWall(
        OverlayRenderer overlay,
        TrainingSceneState scene,
        CameraController camera,
        float hFov,
        float aspect,
        int screenW,
        int screenH)
    {
        var yaw = camera.Yaw;
        var pitch = camera.Pitch;

        overlay.DrawRect(0, screenH * 0.5f, screenW, screenH * 0.5f, Floor);

        if (TryProjectQuad(
                yaw, pitch, hFov, aspect, screenW, screenH,
                new Vector3(-7f, 0f, 8f), new Vector3(7f, 0f, 8f),
                new Vector3(7f, 3.5f, 8f), new Vector3(-7f, 3.5f, 8f),
                out var tl, out var tr, out var br, out var bl))
        {
            overlay.DrawScreenQuad(tl, tr, br, bl, Wall);
        }
        else
        {
            var pw = screenW * 0.65f;
            var ph = screenH * 0.55f;
            overlay.DrawRect((screenW - pw) * 0.5f, screenH * 0.15f, pw, ph, Wall);
        }

        foreach (var mark in scene.BulletMarks)
        {
            DrawBox(overlay, mark.Position, new Vector3(0.04f, 0.04f, 0.01f), Mark,
                yaw, pitch, hFov, aspect, screenW, screenH);
        }
    }

    private static void DrawBox(
        OverlayRenderer overlay,
        Vector3 center,
        Vector3 halfExtents,
        UiVector4 color,
        float yaw,
        float pitch,
        float hFov,
        float aspect,
        int screenW,
        int screenH)
    {
        if (!TryProject(yaw, pitch, hFov, aspect, screenW, screenH, center, out var cx, out var cy, out var depth))
        {
            return;
        }

        var tanHalfH = MathF.Tan(hFov * MathF.PI / 360f);
        var tanHalfV = tanHalfH / aspect;
        var w = halfExtents.X * 2f / (depth * tanHalfH) * screenW;
        var h = halfExtents.Y * 2f / (depth * tanHalfV) * screenH;
        w = Math.Clamp(w, 12f, screenW * 0.4f);
        h = Math.Clamp(h, 20f, screenH * 0.5f);

        overlay.DrawRect(cx - w * 0.5f, cy - h * 0.5f, w, h, color);
        overlay.DrawRectOutline(cx - w * 0.5f, cy - h * 0.5f, w, h, 2f, UiVector4.White);
    }

    private static bool TryProjectQuad(
        float yaw, float pitch, float hFov, float aspect, int screenW, int screenH,
        Vector3 a, Vector3 b, Vector3 c, Vector3 d,
        out Vector2 tl, out Vector2 tr, out Vector2 br, out Vector2 bl)
    {
        tl = tr = br = bl = default;
        if (!TryProject(yaw, pitch, hFov, aspect, screenW, screenH, a, out tl.X, out tl.Y, out _))
        {
            return false;
        }

        if (!TryProject(yaw, pitch, hFov, aspect, screenW, screenH, b, out tr.X, out tr.Y, out _))
        {
            return false;
        }

        if (!TryProject(yaw, pitch, hFov, aspect, screenW, screenH, c, out br.X, out br.Y, out _))
        {
            return false;
        }

        if (!TryProject(yaw, pitch, hFov, aspect, screenW, screenH, d, out bl.X, out bl.Y, out _))
        {
            return false;
        }

        return true;
    }

    private static bool TryProject(
        float yaw, float pitch, float hFov, float aspect,
        int screenW, int screenH, Vector3 world,
        out float sx, out float sy, out float depth)
    {
        sx = sy = 0f;
        var forward = AimMath.ForwardFromAngles(yaw, pitch);
        var right = Vector3.Normalize(Vector3.Cross(forward, Vector3.UnitY));
        var up = Vector3.Cross(right, forward);
        var delta = world - Eye;

        depth = Vector3.Dot(delta, forward);
        if (depth < 0.05f)
        {
            return false;
        }

        var rx = Vector3.Dot(delta, right);
        var uy = Vector3.Dot(delta, up);
        var tanHalfH = MathF.Tan(hFov * MathF.PI / 360f);
        var tanHalfV = tanHalfH / aspect;

        var ndcX = rx / (depth * tanHalfH);
        var ndcY = uy / (depth * tanHalfV);

        sx = (ndcX * 0.5f + 0.5f) * screenW;
        sy = (0.5f - ndcY * 0.5f) * screenH;
        return sx >= -screenW && sx <= screenW * 2f && sy >= -screenH && sy <= screenH * 2f;
    }
}
