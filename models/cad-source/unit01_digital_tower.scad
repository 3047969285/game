// 读写3 Unit1 · 数字书塔（OpenSCAD 可编辑 CAD 源文件）
// 导出: F6 渲染 → File → Export → STL → Blender → GLB
// 水晶体请在 Blender 中命名 Crystal

$fn = 48;
tower_h = 4.2;
base_r = 2.4;

module crystal() {
  color("SkyBlue")
    translate([0, 0, tower_h + 0.9])
      sphere(r = 0.55, $fn = 32);
}

module glass_slice(i) {
  w = 1.6 - i * 0.15;
  d = 1.4 - i * 0.12;
  translate([0, 0, 0.4 + i * 1.0])
    color([0.2, 0.5, 0.95, 0.75])
      cube([w, d, 0.85], center = true);
}

color("Gray")
  cylinder(h = 0.35, r1 = base_r, r2 = base_r * 1.1, center = false);

for (i = [0:3])
  glass_slice(i);

color("LightBlue")
  translate([0, 0, tower_h])
    rotate_extrude()
      translate([0.9, 0, 0])
        circle(r = 0.06);

crystal();
