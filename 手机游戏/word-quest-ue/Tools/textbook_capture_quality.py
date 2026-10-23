"""Pixel quality gate for actual rendered PNGs; never modifies evidence."""
from pathlib import Path

def audit_capture(path, expected_size=(3840,2160)):
    from PIL import Image,ImageStat
    with Image.open(path) as source:
        image=source.convert('RGB')
        size=image.size
    stats=ImageStat.Stat(image)
    mean=sum(c*w for c,w in zip(stats.mean,(.2126,.7152,.0722)))
    histogram=image.convert('L').histogram()
    pixels=size[0]*size[1]
    black=sum(histogram[:3])/pixels
    clipped=sum(histogram[250:])/pixels
    spread=sum(c*w for c,w in zip(stats.stddev,(.2126,.7152,.0722)))
    errors=[]
    if expected_size and tuple(size)!=tuple(expected_size):errors.append(f'resolution {size}, expected {expected_size}')
    if mean<40:errors.append(f'underexposed mean {mean:.2f} < 40')
    if mean>170:errors.append(f'overexposed mean {mean:.2f} > 170')
    if black>.35:errors.append(f'large black area {black:.1%} > 35%')
    if clipped>.15:errors.append(f'clipped white area {clipped:.1%} > 15%')
    if spread<3:errors.append(f'no image detail (luma deviation {spread:.2f})')
    return {'path':str(Path(path)),'resolution':list(size),'mean_luma':round(mean,4),
            'black_fraction':round(black,6),'clipped_fraction':round(clipped,6),
            'luma_stddev':round(spread,4),'capture_quality':'FAIL' if errors else 'PASS','issues':errors}

if __name__=='__main__':
    import json,sys
    print(json.dumps(audit_capture(sys.argv[1])))
