export default function (data) {
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
    });

    const resultArray = Object.values(transformedData);
    return resultArray;
}