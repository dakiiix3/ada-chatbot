# chatbot-typescript

## NativeScript Preview
Ausführen von `tns preview`
Dadurch wird ein QR-Code erzeugt, der mittels der App [Playground](https://play.google.com/store/apps/details?id=org.nativescript.play) gescannt werden. Anschließend wird die App aus der Entwicklungsumgebung in der App [Preview](https://play.google.com/store/apps/details?id=org.nativescript.preview) dargestellt.

## build der APK-Datei
Ausführen von `tns build android --release --key-store-path .keystore --key-store-password Telekom123! --key-store-alias "David Savic" --key-store-alias-password Telekom123!`
Hierdurch wird die APK-Datei für Android erzeugt, die für die Installation bereitgestellt werden kann.

## Ausführen auf verbundenem Android-Smartphone
Zunächst müsst ihr in den Entwickleroptionen des Smartphones das USB-Debugging aktivieren und anschließend das Smartphone per USB an den PC anschließen.
Um den Device Identifier zu ermitteln müsst ihr den folgenden Befehl ausführen. Der Device Identifier wird benötigt, um die App auf dem Smartphone auszuführen: `tns device`
Als Ergebnis bekommt ihr eine Tabelle mit allen verbundenen Geräten:

No │ Device Name │ Platform │ Device Identifier │ Type   │ Status
 1 │ FP2         │ Android  │ fa8f674           │ Device │ Connected

Der Device Identifier muss nun verwendet werden, um die App mit dem Befehl `tns run` zu starten. Dort wird noch ein Parameter für den Device Identifier mitgegeben.
Der Befehl sieht schlussendlich wie folgt aus: `tns run --device fa8f674`
Die App öffnet sich nach kurzer Zeit auf dem verbundenen Smartphone. Hilfreich ist es noch die Option "Aktiv lassen" in den Entwickleroptionen zu aktivieren, damit das Smartphone die ganze Dauer über aktiv bleibt.
Die Änderungen werden beim Speichern direkt per LiveSync auf das Smartphone übernommen.
