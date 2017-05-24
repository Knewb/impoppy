var roleBuilder = require('role.builder');

module.exports = {
    run: function(creep){
        if (creep.memory.working === true && creep.carry.energy === 0) {
            creep.memory.working = false;
            creep.memory.repairTargetId = '0';
        }
        else if (creep.memory.working === false && creep.carry.energy === creep.carryCapacity) {            
            creep.memory.working = true;
            if (creep.memory.repairTargetId == undefined || creep.memory.repairTargetId == '0')
            {
                var walls = creep.room.find(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_WALL
                    && s.hits < s.hitsMax
                });                
                var structure = walls[0]; 
                creep.memory.repairTargetId = structure.id;
                for (let i in walls)
                {                    
                    if (walls[i].hits == 1 || walls[i].hits < structure.hits)
                    {
                        structure = walls[i];
                        creep.memory.repairTargetId = walls[i].id;
                    }
                }
            }
        }
        if (creep.memory.working === true) {
            var structure = Game.getObjectById(creep.memory.repairTargetId);
            if (structure == undefined || structure.hits == structure.maxHits)
            {
                var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.hits < s.hitsMax && s.structureType == STRUCTURE_WALL
                });
            }
            if (structure != undefined && structure.hits != structure.maxHits) {
                if (creep.repair(structure) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }
            }
            else {
                roleBuilder.run(creep);
            }
        }
        else {           

            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER &&
                s.store[RESOURCE_ENERGY] > 0
            });

            if (creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }      
        }    
    }
};