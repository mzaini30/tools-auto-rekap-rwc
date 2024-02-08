<script>
  import gosit from "gosit";
  import olahJson from "./function/olahJson";
  import {
    Table,
    Badge,
    TableBody,
    TableBodyCell,
    TableBodyRow,
    TableHead,
    TableHeadCell,
    Tabs,
    TabItem,
    Checkbox,
    Button,
    Modal,
    TableSearch,
  } from "flowbite-svelte";

  let data = [];

  function olahHasil(data) {
    let dataBaru = [];

    for (let x of data) {
      let nilai = 50;
      if (x["sesuai tema"] == "ya") {
        nilai += 30;
      }
      if (x["sesuai puebi"] == "ya") {
        nilai += 10;
      }
      if (x["jumlah kata sesuai (300 kata)"] == "ya") {
        nilai += 10;
      }
      if (x["terlambat"] == "1 hari") {
        nilai -= 5;
      } else if (x["terlambat"] == "2 hari") {
        nilai -= 10;
      }
      if (x["sesuai tantangan"] == "ya") {
        nilai += 50;
      }
      if (x["apakah tantangan telat dan tidak izin (default: tidak)"] == "ya") {
        nilai -= 50;
      }

      dataBaru.push({
        ...x,
        nilai,
      });
    }

    return dataBaru;
  }

  function cek(data) {
    console.log(JSON.stringify(data[0], null, 2));
  }
  function cekLengkap(data) {
    console.log(JSON.stringify(data, null, 2));
  }

  async function run() {
    let result = await gosit(
      "1HRBdHrsnAUVWtord8V-Y7xHAiDEYRYZONVlLWT_io8I", // spreadsheet id
      "Form Responses 1" // sheet name
    );

    let verifikator = await gosit(
      "1EZ8NBBUZ0QacUnqBYDVc8SfogLJLCQPMiS3aVKeg0Zg", // spreadsheet id
      "Form Responses 1" // sheet name
    );
    data = olahJson(result, olahHasil(verifikator));
    cekLengkap(data);
  }
  run();
</script>

<svelte:head>
  <title>Auto Rekap RWC</title>
</svelte:head>
<div class="p-8">
  <Tabs style="underline" class="sticky top-0 left-0 bg-white z-[10]">
    {#each Array(4) as _, iInduk}
      <TabItem open={iInduk == 0} title="Pekan {iInduk + 1}">
        <Table hoverable={true}>
          <TableHead>
            <TableHeadCell>Nama</TableHeadCell>
            <!-- each angka 1 sampai 27 di Svelte -->
            {#each Array(7) as _, i}
              <TableHeadCell>{i + 1 + iInduk * 7}</TableHeadCell>
            {/each}
          </TableHead>
          <TableBody>
            {#each data.sort( (a, b) => (a["Nama dan Akun Instagram"] > b["Nama dan Akun Instagram"] ? 1 : -1) ) as item}
              <TableBodyRow>
                <TableBodyCell>{item["Nama dan Akun Instagram"]}</TableBodyCell>
                {#each Array(7) as _, i}
                  {#if item.timeline[i + 1 + iInduk * 7] == null}
                    <TableBodyCell></TableBodyCell>
                  {:else}
                    <TableBodyCell>
                      <a
                        target="_blank"
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeKlpzzTdm6nu73ICnuMC6I-ieqtLh-tm6rX9TB4HjHeLAHqg/viewform?usp=pp_url&entry.1929578686={item
                          .timeline[i + 1 + iInduk * 7][
                          'Nama dan Akun Instagram'
                        ]}&entry.592515413={item.timeline[i + 1 + iInduk * 7][
                          'Tema'
                        ]}&entry.661204927={item.timeline[i + 1 + iInduk * 7][
                          'Tautan Tulisan'
                        ]}&entry.1206939061={item.timeline[i + 1 + iInduk * 7][
                          'Nulis hari ke-'
                        ]}&entry.1709363990={item.timeline[i + 1 + iInduk * 7][
                          'Keterangan Tulisan'
                        ]}&entry.291903281={item.timeline[i + 1 + iInduk * 7][
                          'Keterangan Tulisan'
                        ] == 'Utang'
                          ? '1 hari'
                          : 'tidak'}&entry.1941888307=tidak&entry.727814525={item
                          .timeline[i + 1 + iInduk * 7]['Keterangan Tulisan'] ==
                        'Tantangan'
                          ? 'ya'
                          : 'bukan tantangan'}"
                      >
                        {#if item.timeline[i + 1 + iInduk * 7]["nilai"] == 0}
                          <Badge color="yellow">belum diperiksa</Badge>
                        {:else}
                          <Badge color="green"
                            >{item.timeline[i + 1 + iInduk * 7]["nilai"]}</Badge
                          >
                        {/if}
                        <!-- {#if item.timeline[i + 1 + iInduk * 7]["Keterangan Tulisan"] == "Hari Ini"}
                          <Badge color="green"
                            >{item.timeline[i + 1 + iInduk * 7][
                              "Keterangan Tulisan"
                            ]}</Badge
                          >
                        {/if}
                        {#if item.timeline[i + 1 + iInduk * 7]["Keterangan Tulisan"] == "Utang"}
                          <Badge color="yellow"
                            >{item.timeline[i + 1 + iInduk * 7][
                              "Keterangan Tulisan"
                            ]}</Badge
                          >
                        {/if}
                        {#if item.timeline[i + 1 + iInduk * 7]["Keterangan Tulisan"] == "Tantangan"}
                          <Badge color="red"
                            >{item.timeline[i + 1 + iInduk * 7][
                              "Keterangan Tulisan"
                            ]}</Badge
                          >
                        {/if} -->
                      </a>
                    </TableBodyCell>
                  {/if}
                {/each}
              </TableBodyRow>
            {/each}
          </TableBody>
        </Table>
      </TabItem>
    {/each}
  </Tabs>
</div>
