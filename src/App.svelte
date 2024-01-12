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
  async function run() {
    let result = await gosit(
      "1HRBdHrsnAUVWtord8V-Y7xHAiDEYRYZONVlLWT_io8I", // spreadsheet id
      "Form Responses 1" // sheet name
    );
    data = olahJson(result);
  }
  run();
  let clickOutsideModal = false;
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
                        href={item.timeline[i + 1 + iInduk * 7][
                          "Tautan Tulisan"
                        ]}
                      >
                        <!-- keterangan tulisan:
                    Hari Ini
    Utang
    Tantangan -->
                        {#if item.timeline[i + 1 + iInduk * 7]["Keterangan Tulisan"] == "Hari Ini"}
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
                        {/if}
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
