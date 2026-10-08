# GitHub Public CV

Cong cu nay dung de hien thi CV cong khai tren GitHub Pages, su dung du lieu JSON xuat ra tu `CV Builder Pro`.

## Muc tieu

- Hien thi CV theo mau 2 cot, in A4.
- Ho tro 2 bo du lieu rieng: `vi` va `en`.
- Chuyen doi ngon ngu ngay tren trang.
- Nhan file JSON tai trinh duyet de test nhanh truoc khi deploy.

## Cau truc thu muc

- `index.html`: giao dien public CV
- `styles.css`: style cho man hinh va print A4
- `app.js`: logic render + load JSON + switch VI/EN
- `data/cv-public.json`: du lieu CV mac dinh duoc repo phuc vu

## Cach cap nhat du lieu CV tu tool chinh

1. Mo tool `CV Builder Pro` trong thu muc goc.
2. Bam `Xuat ca Viet + Anh` de xuat file JSON day du 2 CV.
3. Doi ten file vua xuat thanh `cv-public.json`.
4. Ghi de file vao `github-public-cv/data/cv-public.json`.
5. Reload trang public de kiem tra.

Ghi chu:
- Neu chi nhap 1 CV (single doc), app public se cap nhat vao ngon ngu dang chon (`vi` hoac `en`) va giu nguyen ngon ngu con lai.
- Neu nhap JSON co `documents.vi` va `documents.en`, app se cap nhat dong thoi ca 2 CV.

## Deploy len GitHub Pages

### Cach 1: Repo rieng cho CV public (de quan ly)

1. Tao repo moi, vi du: `yourname-public-cv`.
2. Copy toan bo file trong thu muc `github-public-cv` vao repo moi (de o root).
3. Push len GitHub.
4. Vao `Settings` -> `Pages`.
5. Chon:
   - `Source`: `Deploy from a branch`
   - `Branch`: `main`
   - `Folder`: `/ (root)`
6. Luu lai. Sau 1-2 phut, trang se co URL dang:
   - `https://<username>.github.io/<repo-name>/`

### Cach 2: Dat trong mot repo lon hien co

1. Dat thu muc `github-public-cv` ben trong repo.
2. Vao `Settings` -> `Pages`.
3. Chon branch va folder la `/github-public-cv` (neu UI ho tro), hoac
4. Tao workflow Pages de publish dung thu muc nay.

## Tuy bien nhanh

- Doi font: sua `theme.fontPreset` trong JSON (`be_vietnam` hoac `roboto`).
- Doi bo cuc: `theme.layout` = `left`, `right`, hoac `stacked`.
- Doi ti le sidebar: `theme.sidebarWidth` (22-48).
- Doi khoang cach 2 cot giai thuong: `theme.awardColumnGap`.
- Bat/tat section: sua object `visibility`.

## In / xuat PDF

- Bam nut `In / Xuat PDF` tren trang.
- App dung print-style A4, giu bo cuc va mau nen gan nhat voi giao dien hien thi.

