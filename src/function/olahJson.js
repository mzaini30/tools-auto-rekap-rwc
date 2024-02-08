export default function (data, dataVerifikator) {
    const transformedData = {};


    data.forEach(entry => {
        const namaAkun = entry["Nama dan Akun Instagram"];
        const nulisHari = entry["Nulis hari ke-"];

        if (!transformedData[namaAkun]) {
            transformedData[namaAkun] = {
                "Nama dan Akun Instagram": namaAkun,
                "timeline": {}
            };
        }

        transformedData[namaAkun]["timeline"][nulisHari] = entry;
        transformedData[namaAkun]["timeline"][nulisHari]['nilai'] = null;

        for (let x of dataVerifikator) {
            if (x['nama (terisi otomatis)'] === namaAkun && x['hari ke (terisi otomatis)'] === nulisHari) {
                transformedData[namaAkun]["timeline"][nulisHari]['nilai'] = x['nilai'];
            }
        }
    });

    const resultArray = Object.values(transformedData);
    return resultArray;
}