mkdir -p ../../public/assets/fonts/atkinson-hypereligible/mono

pyftsubset ./atkinson-hypereligible/normal.ttf --output-file=../../public/assets/fonts/atkinson-hypereligible/normal.woff2 --flavor=woff2 --text-file=alphabet.txt --layout-features='*' --no-hinting --desubroutinize --with-zopfli
pyftsubset ./atkinson-hypereligible/italic.ttf --output-file=../../public/assets/fonts/atkinson-hypereligible/italic.woff2 --flavor=woff2 --text-file=alphabet.txt --layout-features='*' --no-hinting --desubroutinize --with-zopfli
pyftsubset ./atkinson-hypereligible/mono.ttf --output-file=../../public/assets/fonts/atkinson-hypereligible/mono/normal.woff2 --flavor=woff2 --text-file=alphabet.txt --layout-features='*' --no-hinting --desubroutinize --with-zopfli
pyftsubset ./atkinson-hypereligible/mono-italic.ttf --output-file=../../public/assets/fonts/atkinson-hypereligible/mono/italic.woff2 --flavor=woff2 --text-file=alphabet.txt --layout-features='*' --no-hinting --desubroutinize --with-zopfli
