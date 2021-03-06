export interface Harvester extends Creep {
  memory: HarvesterMemory;
}

interface HarvesterMemory extends CreepMemory {
  building: boolean;
  role: 'harvester';
}


const roleHarvester = {

  run(creep: Creep): void {
    if (creep.store.getFreeCapacity() > 0) {
      let resources = creep.room.find(FIND_DROPPED_RESOURCES)
      if (resources.length > 0) {
        resources = _.sortBy(resources, r => creep.pos.getRangeTo(r));
        if(creep.pickup(resources[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(resources[0], { visualizePathStyle: { stroke: '#ffaa00' }});
        }
      } else {
        const sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
      }
    } else {
      const targets = creep.room.find(FIND_MY_STRUCTURES, { filter: isToBeFilled });

      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
        }
      }
    }
  }
};

/*
* Body building
* - if RCL is 1 than make WORK, CARRY, MOVE
* - if RCL is 2 or more than make all carry and move.
* - if 
*/

function isToBeFilled(structure: Structure): boolean {
  if (structure.structureType === STRUCTURE_EXTENSION
    || structure.structureType === STRUCTURE_SPAWN
    || structure.structureType === STRUCTURE_TOWER
  ) {
    const s = structure as StructureExtension | StructureSpawn | StructureTower;
    return s.energy < s.energyCapacity;
  }
  return false;
}

export default roleHarvester;
export { isToBeFilled };
