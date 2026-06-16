// 读写3 Unit4 · 拱门
$fn = 40;

color("Gray") cylinder(h = 0.35, r = 2.8);
for (x = [-1.1, 1.1])
  color("DarkGray") translate([x, 0, 0.35]) cube([0.45, 0.45, 2.8], center = false);

color("Tan")
  translate([0, 0, 2.9]) rotate([0, 90, 0]) rotate_extrude(angle = 180)
    translate([1.1, 0, 0]) circle(r = 0.18);

color("Gold") translate([0, 0, 4.5]) sphere(r = 0.55);
