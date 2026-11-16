# Pčelinjak Radić

Statičan sajt za med i pčelinje proizvode. HTML, CSS i mali JavaScript za mobilni meni i godinu u podnožju. Nema frameworka, instalacije paketa, korpe, naloga ili backenda.

## Pokretanje

Otvorite `index.html` u browseru ili, za lokalni HTTP pregled, iz foldera projekta pokrenite:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Otvorite `http://127.0.0.1:4173`. Server se zaustavlja sa `Ctrl+C`. Na Windows-u možete koristiti `py -3` umesto `python3`.

Fotografije i fontovi su lokalni. Internet je potreban za Google mapu. Pozivi i mejl linkovi otvaraju telefonsku odnosno mejl aplikaciju na uređaju; poruka se ne šalje automatski. Bez JavaScripta navigacija ostaje vidljiva i svi linkovi rade.

## Produkciona priprema i ZIP

Sajt ne zahteva kompilaciju. Za pripremu direktorijuma za hosting i čistog izvornog paketa pokrenite (Python 3.9 ili noviji):

```sh
python3 build.py
```

Komanda ponovo kreira `dist/` sa produkcionim fajlovima i `prodaja-final.zip` sa kompletnim izvornim projektom i uputstvima. ZIP sadrži folder `prodaja-final/`. Koristi se eksplicitna lista fajlova; `.git`, tajni podaci, keševi i zavisnosti ne ulaze u paket. Paket nema dupliranu kopiju `dist/`, jer su HTML, CSS, JS i asseti već spremni za posluživanje.

Za proveru produkcionog izlaza:

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

GitHub repozitorijum: `medradic/prodaja`. GitHub Pages se objavljuje iz grane `main`, folder `/`, koristeći statične fajlove iz korena. Za drugi statični hosting može da se koristi sadržaj `dist/`. Relativne putanje podržavaju i hosting u podfolderu. `.nojekyll` je zadržan radi kompatibilnosti sa postojećim načinom GitHub Pages objave.

## Sadržaj i izmene

- `index.html` — sadržaj, proizvodi, kontakt i metapodaci.
- `style.css` — izgled i prilagođavanje ekranima.
- `script.js` — meni, Escape, zatvaranje posle izbora i godina.
- `assets/` — pet originalnih PNG fotografija, njihove WebP verzije bez gubitka kvaliteta i postojeća ikonica sajta.
- `assets/fonts/` — lokalni Yrsa font, regularni i kurziv, sa SIL OFL licencom. Font podržava č, ć, š, ž i đ; običan tekst koristi Arial/Helvetica.
- `build.py` — produkciona priprema i pakovanje bez dodatnih biblioteka.
- `PROVERA.md` — izvršene provere i ograničenja okruženja.

Sačuvani podaci:

- Pčelinjak Radić, porodični pčelinjak.
- Bela Crkva, Krupanj, Srbija.
- Telefon: **062 887 2109** (`+381628872109`).
- Mejl: **radiccslobodan@gmail.com**.
- Bagremov med, livadski med, propolis, med u teglicama i voštani poklopčići u medu.

U izvornom sadržaju nisu bile navedene cene ni gramaže. Nisu dodavane pretpostavljene vrednosti, tvrdnje o zdravlju, sertifikati, recenzije ni uslovi dostave. Kupac kontaktira prodavca za cenu, pakovanje i porudžbinu. Upiti uz proizvode otvaraju mejl sa odgovarajućim naslovom; nema forme niti lažne potvrde slanja.

Fotografije su iz dostavljenog projekta, približno 350 × 220 px. Njihov sadržaj, boje i etikete nisu menjani. Veličina prikaza je ograničena da se ne uvećavaju previše. Za više detalja na ekranima velike gustine piksela potrebni su originali veće rezolucije.

Google mapa zadržava postojeću pretragu „Pčelinjak Radić, Bela Crkva, Krupanj“. Projekat ne sadrži potvrđene koordinate ni tačnu ulicu; pin nije predstavljen kao potvrđena adresa. Link za otvaranje Google mapa ostaje dostupan nezavisno od ugrađene mape. Metapodaci ne navode izmišljen domen, canonical adresu ili apsolutni OG image URL.
