// 读写3 Unit2 · 古典亭阁
$fn = 40;

color("Gray") cylinder(h = 0.35, r = 2.6);

for (x = [-0.9, 0.9])
  color("Silver") translate([x, 0, 0.35]) cylinder(h = 2.6, r = 0.11);

color("SlateBlue")
  translate([0, 0, 2.95]) rotate([0, 0, 45]) cylinder(h = 1.1, r1 = 1.7, r2 = 0.1);

color("Plum")
  translate([0, 0, 4.2]) sphere(r = 0.55);
