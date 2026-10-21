"""Shared hairline / scalp definition (used by hair_cards.py and project_mpfb.py).

Everything is expressed in the head frame of the fitted MPFB body: front is -Y, up is +Z.
Heights are relative to measured landmarks so the same rule works for any fitted head.
"""
import numpy as np

# azimuth knots (deg, 0 = front, 90 = side over the ear, 180 = back) -> hairline height,
# given as a fraction between the brow line (0) and the head top (1); negative = below the brows
STYLES = {
    "male": dict(az=[0, 35, 60, 74, 80, 86, 104, 122, 150, 180],
                 h=[0.48, 0.44, 0.30, 0.02, -0.22, 0.04, 0.04, -0.55, -0.85, -0.95]),
    "female": dict(az=[0, 35, 60, 74, 80, 86, 104, 122, 150, 180],
                   h=[0.50, 0.46, 0.32, 0.05, -0.15, 0.06, 0.06, -0.55, -0.85, -0.95]),
}


def azimuth(P, hc):
    return np.degrees(np.abs(np.arctan2(P[:, 0] - hc[0], -(P[:, 1] - hc[1]))))


def hair_height(P, hc, z_brow, z_top, style):
    st = STYLES[style]
    hfrac = np.interp(azimuth(P, hc), st["az"], st["h"])
    return z_brow + hfrac * (z_top - z_brow)


def scalp_weight(P, hc, z_brow, z_top, style, soft):
    """1 on the scalp, 0 on bare skin, soft ramp of width `soft` (metres) across the hairline."""
    zl = hair_height(P, hc, z_brow, z_top, style)
    return np.clip((P[:, 2] - zl) / soft + 0.5, 0, 1)
