import { mockGlobal, mockInstanceOf } from "screeps-jest";
import spawnRole from './rolesorter';
// import roleBuilder, { Builder } from '../roles/builder';
// import roleHarvester, { Harvester } from '../roles/harvester';
import Harvester from '../roles/harvester'

const builder = mockInstanceOf<Creep>({ memory: { role: 'builder' } });

describe("Role sorter", () => {

  it("creates harvester creeps first.", () => {
    mockGlobal<Game>('Game', {creeps: {builder}})


    expect(spawnRole.spawnRole()).toBe("harvester");
  });

  it("creates three (3) harvester creeps first.", () => {

    const harvester1 = mockInstanceOf<typeof Harvester>({ memory: { role: "harvester" } });
    const harvester2 = mockInstanceOf<typeof Harvester>({ memory: { role: "harvester" } });

    mockGlobal<Game>('Game', {
 creeps: {
        harvester1,
        harvester2
      }
})

    expect(spawnRole.spawnRole()).toBe("harvester");
  });

  it("creates two (2) upgraders after three (3) harvesters", () => {
    const harvester1 = mockInstanceOf<typeof Harvester>({ memory: { role: "harvester" } });
    const harvester2 = mockInstanceOf<typeof Harvester>({ memory: { role: "harvester" } });
    const harvester3 = mockInstanceOf<typeof Harvester>({ memory: { role: "harvester" } });


    mockGlobal<Game>('Game', {
 creeps: {
        harvester1,
        harvester2,
        harvester3
      }
})

    expect(spawnRole.spawnRole()).toBe("upgrader");
  })

  it("creates 1 builders after 3 harvesters.", () => {
    const harvester1 = mockInstanceOf<typeof Harvester>({ memory: { role: "harvester" } });
    const harvester2 = mockInstanceOf<typeof Harvester>({ memory: { role: "harvester" } });
    const harvester3 = mockInstanceOf<typeof Harvester>({ memory: { role: "harvester" } });
    // const room1 = mockInstanceOf<Room>({})

    mockGlobal<Game>('Game', {
 creeps: {
        harvester1,
        harvester2,
        harvester3
      }
})

    expect(spawnRole.spawnRole()).toBe("upgrader");
  })

});

