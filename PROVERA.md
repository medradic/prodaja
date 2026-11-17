# Izveštaj o proveri

## Redizajn — 17. novembar 2026.

Novi vizuelni identitet: svetla topla podloga (#f6f4ee), tamno mastilo, jedan medeni akcenat, zaobljene kartice sa tankim okvirima. Tekst sveden na nazive, lokaciju i kontakt, bez prodajnih fraza. Sadržaj, nazivi proizvoda, fotografije, kontakt podaci, fontovi i `script.js` ostali su isti.

- Galerija: mreža 3/2/1 kolone, numerisane kartice, šesta kartica vodi na kontakt.
- Kontakt: tabela Telefon / Email / Lokacija sa linkom ka mapi.
- Provereno u Chrome-u na 1440 i 390 px: nema horizontalnog skrola ni JavaScript grešaka, mobilni meni radi; `node --check script.js` prolazi.

## Portfolio verzija

Sajt sadrži predstavljanje pčelinjaka, galeriju pet proizvoda i kontakt. Nema prodavnice, cena, poručivanja, upita uz proizvode, korpe, naloga ili plaćanja. Koristi krem i medenožutu podlogu, smeđe akcente, lokalne fontove Noto Serif i Lato i linijski motiv pčele. README po zahtevu sadrži samo `sajt`.

## Izvršeno

- Pregledani svi početni HTML, CSS, JS, README i SVG fajlovi, kao i svih pet originalnih fotografija. Projekat je već bio raspakovan. Nije pronađen `AGENTS.md`; radni folder nije sadržao upotrebljiv Git repozitorijum.
- Provera HTML strukture parserom, jedinstvenih ID-jeva, odredišta internih linkova, lokalnih resursa, dimenzija i alt opisa fotografija.
- Provera očuvanja svih pet naziva proizvoda, telefona, mejla i lokacije; validni `tel:` i `mailto:` linkovi u kontaktu. Galerija nema dugmad za upite niti poručivanje.
- Provera JavaScript sintakse sa `node --check script.js`.
- Provera podrške za srpska latinična slova u svim lokalnim datotekama fontova Noto Serif i Lato.
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

Kontakt koristi direktan link ka Google mapama umesto ugrađene mape. Nisu dodavane nepotvrđene koordinate. Stvarni telefonski poziv i slanje mejla nisu izvršavani.

## Kratka ručna provera u browseru

1. Pokrenite lokalni server komandom `python3 -m http.server 4173 --bind 127.0.0.1` i otvorite sajt na 360, 390, 768 i 1440 px.
2. Proverite da nema horizontalnog skrola, preklapanja teksta i isečenih fotografija.
3. Na uskom ekranu otvorite meni, izaberite sekciju, zatvorite ga tasterom Escape i klikom van zaglavlja. Proverite i Tab navigaciju.
4. Proverite poziv, mejl i link ka Google mapama.
5. Isključite JavaScript i proverite vidljivost navigacije; uključite smanjeno kretanje i proverite da skrolovanje nije animirano.

Repozitorijum za isporuku: `medradic/prodaja`. GitHub Pages koristi granu `main`, folder `/` (objava je naknadno zatražena).
