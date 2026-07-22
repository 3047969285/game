// 读写3 Unit3 · 螺旋塔
$fn = 32;

color("DarkGreen") cylinder(h = 0.35, r = 2.3);
color("SeaGreen") translate([0, 0, 0.35]) cylinder(h = 3.8, r1 = 0.85, r2 = 0.55);

for (i = [0:5])
  color("MediumSpringGreen")
    translate([0, 0, 0.8 + i * 0.55])
      rotate([0, 0, i * 60])
        translate([0.75, 0, 0])
          cube([1.1, 0.35, 0.08], center = true);

color("Turquoise") translate([0, 0, 4.8]) sphere(r = 0.55);
