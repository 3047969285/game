// 读写3 Unit6 · 神殿方尖碑
$fn = 40;

color("RosyBrown") cylinder(h = 0.35, r = 3);
color("Tan") translate([0, 0, 0.35]) cube([2.8, 2.2, 0.25], center = false);
color("Pink")
  translate([0, 0, 0.6]) cylinder(h = 3.4, r1 = 0.38, r2 = 0.22);
color("HotPink")
  translate([0, 0, 4.1]) rotate_extrude() translate([1.2, 0, 0]) circle(r = 0.05);
color("LightPink") translate([0, 0, 5.1]) sphere(r = 0.55);
