http://paulbourke.net/dataformats/

BMP stores your image as data in a grid. It essentially stores information as X1, Y1: blue. X2, Y1: blue. X3, Y1, red. It (normally) has no compression at all and takes up a huge amount of space on disk.

TGA works similarly to BMP, but also supports more features. Most important is the ability to store "transparency" - that is, how "much" of a color shows as opaque vs how much it lets whatever is "behind" it bleed through. This format takes even more space than BMP in normal situations, but can support compression (it usually doesn't).

PNG is similar to BMP and TGA in that it is "lossless". If you save your image as a PNG, it will look EXACTLY the same in the future. No data will be lost. Like TGA, it also supports transparency. The key difference is that it's a more modern format and is always compressed. This means it will take SUBSTANTIALLY less space than BMP or TGA under default settings.

JPG is the "lossy" image storage format. Saving an image as a JPG will always lose data - even if you already have a JPG, and change only a small item - after re-saving it, you will lose more data. It works by telling the computer "I want an image that looks like this". The computer then decides what the best approximation of that image would be to the human eye, and how best to save that without taking up too much space. It then saves the approximation to disk. This means the image will ALWAYS lose data.

To summarize:

BMP has its uses. But typically most people do not want to use this format unless you need it specifically for a programming reason.

TGA used to be the "de-facto" lossless format years ago. It currently takes much more space than PNG and isn't worth your time unless you need it specifically for a programming reason.

PNG is the best format to use if you MUST have "lossless" image saving. Since it's compressed differently from JPG, it can actually beat JPG in size AND quality when the image contains large blocks of exact solid colors. It also is the only good choice among these 4 for transparent images used on web pages.

JPG is the best format to use for photos if size is a concern. It offers the best balance of speed, usability, and quality for images which come from a photographic source and have many real-life incongruities which are otherwise indistinguishable to the naked eye.

GIF - an old format for web use. Mainly only used for animations, as all of its other features are supported by PNG, which also has many more options and does not have issues with software patents.

TIFF - An image container that can have several different possible formats. Usually it is uncompressed, although there are both lossy and lossless compression modes. Notable for being able to support layers. Often used to store photographs that were converted from a camera's raw image format, as well as send files to be printed.

OpenEXR (.exr) - Similar to PNG in a lot of ways (lossless, transparency, etc), but uses bigger numbers to store color values (instead of 1-256, it uses 0.0-1.0 with either 16 or 32 digits), which gives it a bigger range of colors and contrast it can store. It can also store additional arbitrary channels, allowing it to carry things like the depth of objects in the image, or the separate components of a 3D rendering (reflections, highlights, contributions from different lights, etc). Originally designed by Industrial Light and Magic for movie visual effects work. Sometime used in place of Radiance HDR as well for photography.

Radiance HDR (.hdr) - A format for storing high-dynamic range photographs. Like OpenEXR it uses bigger numbers to represent the color ranges, allowing it to store more information.

Photoshop (.psd) - Adobe Photoshop's project file format. Vaguely similar to TIFF, but contains Photoshop's specific working info like layer styles, undo history, and so-on.

GIMP (.xcf) - Like PSD, but for GIMP instead of Photoshop.

DPX/Cineon - Image file formats common in scanning and printing film.
