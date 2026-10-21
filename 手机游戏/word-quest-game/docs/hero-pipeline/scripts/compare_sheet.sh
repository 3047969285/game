cd ~/.local/share/hunyuan3d/work/fit && ~/.local/share/hunyuan3d/.venv/bin/python -c "
from PIL import Image
def onwhite(f):
    im=Image.open(f).convert('RGBA'); bg=Image.new('RGBA',im.size,(255,255,255,255)); bg.alpha_composite(im); return bg.convert('RGB').resize((512,512))
ims=[onwhite(f'male_look_{n}.png') for n in ['front','q34','side','back']]
ref=[Image.open(f).convert('RGB').resize((512,512)) for f in ['../headviews/male_front.png','../headviews/male_q34.png','../headviews/male_left.png','../headviews/male_back.png']]
c=Image.new('RGB',(2048,1024),'white')
for i,(a,b) in enumerate(zip(ims,ref)): c.paste(b,(512*i,0)); c.paste(a,(512*i,512))
c.save('/private/tmp/claude-501/-Users-shoudaodefengge---/ce42f6d7-a5fe-4c42-844c-2c752da6d96c/scratchpad/look.png')"
