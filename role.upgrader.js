module.exports = {    
    run: function(creep){
        if (creep.memory.working == true && creep.carry.energy < 8) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {            
            creep.memory.working = true;
        }
        if (creep.memory.working == true) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE){
                creep.moveTo(creep.room.controller);
            }          
            let structure = creep.pos.findClosestByRange(FIND_STRUCTURES,1, {
                filter: s => s.structureType == STRUCTURE_STORAGE &&
                s.store[RESOURCE_ENERGY] > 0
            });   
            if (structure) {
                creep.withdraw(structure,RESOURCE_ENERGY);
            }
        }
        else {
            let structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_STORAGE &&
                s.store[RESOURCE_ENERGY] > 0
            });
            if (structure == null) {            
                structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: s => s.structureType == STRUCTURE_CONTAINER &&
                    s.store[RESOURCE_ENERGY] > 0
                });
            }

            if (creep.withdraw(structure,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure);
            }
            // var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            
            // if (creep.harvest(source) == ERR_NOT_IN_RANGE){
            //     creep.moveTo(source);
            // }
        }    
    }
};