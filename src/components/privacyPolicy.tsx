export default function PrivacyPolicy() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">
        Polityka Prywatności
        <br />
        <span className="text-lg font-normal">
          PM eMountainBikes – Wypożyczalnia Rowerów i Hulajnóg Elektrycznych
        </span>
      </h2>

      <ol className="list-decimal list-inside space-y-4">
        <li>
          <strong>Administrator danych osobowych</strong>
          <br />
          Administratorem Twoich danych osobowych jest:
          <br />
          Patryk Michniak PM eMountainBikes
          <br />
          ul. Nowe Bystre 113
          <br />
          e-mail: pmemountainbikes@gmail.com
          <br />
          telefon: +48 515 551 325
        </li>

        <li>
          <strong>Zakres zbieranych danych</strong>
          <br />
          W ramach korzystania z aplikacji zbieramy następujące dane:
          <br />
          Imię i nazwisko, adres e-mail, numer telefonu, informacje o płatnościach (przez operatora), dane
          lokalizacyjne (za zgodą), informacje techniczne.
        </li>

        <li>
          <strong>Cel przetwarzania danych</strong>
          <br />
          Dane przetwarzane są w celu:
          <br />
          - realizacji umowy wypożyczenia,
          <br />
          - identyfikacji użytkownika,
          <br />
          - kontaktu,
          <br />
          - realizacji płatności,
          <br />
          - bezpieczeństwa,
          <br />
          - dochodzenia roszczeń,
        </li>

        <li>
          <strong>Podstawa prawna przetwarzania</strong>
          <br />
          Zgodnie z art. 6 RODO:
          <br />
          - lit. b (wykonanie umowy),
          <br />
          - lit. c (obowiązki prawne),
          <br />
          - lit. f (uzasadnione interesy),
          <br />- lit. a (zgoda użytkownika).
        </li>

        <li>
          <strong>Odbiorcy danych</strong>
          <br />
          Dane mogą być udostępniane pracownikom, operatorom płatności oraz organom publicznym.
        </li>

        <li>
          <strong>Przechowywanie danych</strong>
          <br />
          Dane przechowywane są przez okres niezbędny do realizacji celów,
          maksymalnie 6 lat dla roszczeń, dane lokalizacyjne tylko przez czas
          wypożyczenia.
        </li>

        <li>
          <strong>Twoje prawa</strong>
          <br />
          Masz prawo do dostępu, sprostowania, usunięcia, ograniczenia
          przetwarzania, sprzeciwu, przenoszenia danych oraz wniesienia skargi.
        </li>

        <li>
          <strong>Dobrowolność podania danych</strong>
          <br />
          Podanie danych jest dobrowolne, ale konieczne do korzystania z usług.
        </li>

        <li>
          <strong>Bezpieczeństwo danych</strong>
          <br />
          Stosujemy środki techniczne i organizacyjne chroniące dane przed
          nieuprawnionym dostępem i utratą.
        </li>

        {/* <li>
          <strong>Pliki cookies i dane techniczne</strong>
          <br />
          Aplikacja używa plików cookies do logowania, analizy i zapamiętywania
          ustawień.
        </li> */}

        <li>
          <strong>Zmiany Polityki Prywatności</strong>
          <br />
          Polityka może ulec zmianie, aktualna wersja będzie dostępna w
          aplikacji.
        </li>
      </ol>
    </div>
  );
}
