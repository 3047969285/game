// 读写3 Unit5 · 天文台
$fn = 48;

color("Gray") cylinder(h = 0.35, r = 2.5);
color("Silver") translate([0, 0, 0.35]) cylinder(h = 1.2, r = 1.2);
color("LightSteelBlue", 0.8)
  translate([0, 0, 1.55]) sphere(r = 1.05);
color("Black")
  translate([0.3, 0, 2.8]) rotate([55, 0, 0]) cylinder(h = 1.4, r = 0.08);

color("Lavender") translate([0, 0, 4.3]) sphere(r = 0.55);
