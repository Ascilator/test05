import { Chart, Table, Tabs } from "./components";
import { useResDeformationService, useResThermoChainService } from "./services";

function App() {
  const tableDataThermochain = useResThermoChainService();
  const tableDataDeformation = useResDeformationService();

  return (
    <Tabs>
      <div>
        <Table
          tableHeaders={tableDataDeformation.tableHeaders}
          tableBody={tableDataDeformation.tableBody}
        ></Table>
        <Chart
          title="Deformation chart"
          factLine={tableDataDeformation.factLine}
          trendLine={tableDataDeformation.trendLine}
        />
      </div>
      <div>
        <Table
          tableHeaders={tableDataThermochain.tableHeaders}
          tableBody={tableDataThermochain.tableBody}
          withSubHeader
        ></Table>
        <Chart
          title="ThermoChain chart"
          factLine={tableDataThermochain.factLine}
          trendLine={tableDataThermochain.trendLine}
        />
      </div>
    </Tabs>
  );
}

export default App;
