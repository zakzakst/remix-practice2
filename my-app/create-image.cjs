const fs = require("node:fs");
const zlib = require("node:zlib");

const TARGET_SIZE = 3 * 1024 * 1024;
const OUTPUT_FILE = "test_image.png";

// 1×1ピクセルの白いPNG
const base64 =
  "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/mN8AAAAASUVORK5CYII=";

const png = Buffer.from(base64, "base64");

// PNGの終端チャンク
const iend = Buffer.from([
  0, 0, 0, 0, 0x49, 0x45, 0x4e, 0x44, 0xae, 0x42, 0x60, 0x82,
]);

const iendPos = png.lastIndexOf(iend);

if (iendPos < 0) {
  throw new Error("PNGの終端チャンクが見つかりません");
}

// チャンク構造：長さ4 + 種類4 + データ + CRC4
const paddingSize = TARGET_SIZE - png.length - 12;

if (paddingSize < 0) {
  throw new Error("目標サイズが小さすぎます");
}

const type = Buffer.from("npAd");
const data = Buffer.alloc(paddingSize, 0);
const length = Buffer.alloc(4);
length.writeUInt32BE(paddingSize);

// CRC32を計算
function crc32(buffer) {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc ^= byte;

    for (let i = 0; i < 8; i++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xedb88320 : 0);
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}

const crcInput = Buffer.concat([type, data]);
const crc = Buffer.alloc(4);
crc.writeUInt32BE(crc32(crcInput));

const chunk = Buffer.concat([length, type, data, crc]);

const result = Buffer.concat([
  png.subarray(0, iendPos),
  chunk,
  png.subarray(iendPos),
]);

if (result.length !== TARGET_SIZE) {
  throw new Error(`サイズ不一致: ${result.length}`);
}

fs.writeFileSync(OUTPUT_FILE, result);

console.log(`作成完了: ${OUTPUT_FILE}`);
console.log(`サイズ: ${fs.statSync(OUTPUT_FILE).size} bytes`);
