# Izveštaj o proveri

## Izvršeno

- Pregledani svi početni HTML, CSS, JS, README i SVG fajlovi, kao i svih pet originalnih fotografija. Projekat je već bio raspakovan. Nije pronađen `AGENTS.md`; radni folder nije sadržao upotrebljiv Git repozitorijum.
- Provera HTML strukture parserom, jedinstvenih ID-jeva, odredišta internih linkova, lokalnih resursa, dimenzija i alt opisa fotografija.
- Provera očuvanja svih pet naziva proizvoda, telefona, mejla i lokacije; validni `tel:` i `mailto:` linkovi, uključujući naslove upita za svaki proizvod.
- Provera JavaScript sintakse sa `node --check script.js`.
- Provera podrške za srpska latinična slova u obe lokalne datoteke fonta.
- Poređenje dekodiranih PNG i WebP piksela: nema promene slike. Ukupna veličina fotografija smanjena je sa 552.076 na 403.006 bajtova u browserima koji podržavaju WebP; PNG ostaje rezervni format.
- Produkciona priprema: `python3 build.py`; provera kopiranih fajlova u `dist/` i integriteta ZIP paketa.
- Paket koristi eksplicitnu listu projektnih fajlova: bez `node_modules`, keševa, Git podataka i tajnih konfiguracija.

## Browser provera — 16. novembar 2026.

Posle promene dozvola uspešno su pokrenuti lokalni HTTP server i Chrome. Pregledani su snimci cele stranice na 360, 390, 768 i 1440 px. Nema horizontalnog skrola niti elemenata koji izlaze iz širine ekrana; sve lokalne fotografije su učitane.

Provereno u Chrome-u:

- Otvaranje mobilnog menija, zatvaranje tasterom Escape, klikom na sekciju i klikom van zaglavlja.
- Vraćanje fokusa na dugme posle Escape i prelazak fokusa na izabranu sekciju.
- Vidljiva navigacija kada je JavaScript isključen.
- Isključeno glatko skrolovanje pri `prefers-reduced-motion: reduce`.
- Bez JavaScript izuzetaka tokom pregleda.

Ugrađena spoljna Google mapa nije se prikazala u kontrolisanom Chrome okruženju; njen prikaz i tačnost rezultata pretrage ostaju nepotvrđeni. Sačuvan je nezavisan link za otvaranje Google mapa. Stvarni telefonski poziv i slanje mejla nisu izvršavani.

## Kratka ručna provera u browseru

1. Pokrenite lokalni server prema README-u i otvorite sajt na 360, 390, 768 i 1440 px.
2. Proverite da nema horizontalnog skrola, preklapanja teksta i isečenih fotografija.
3. Na uskom ekranu otvorite meni, izaberite sekciju, zatvorite ga tasterom Escape i klikom van zaglavlja. Proverite i Tab navigaciju.
4. Proverite poziv, mejl i naslov upita za svih pet proizvoda, kao i Google mape.
5. Isključite JavaScript i proverite vidljivost navigacije; uključite smanjeno kretanje i proverite da skrolovanje nije animirano.

Repozitorijum za isporuku: `medradic/prodaja`. GitHub Pages koristi granu `main`, folder `/` (objava je naknadno zatražena).
