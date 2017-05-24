var roleUpgrader = require('role.upgrader');

module.exports = {
    run: function(creep){
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {            
            creep.memory.working = true;
        }
        if (creep.memory.working == true) {            
            var constructionSite = creep.memory.role != 'waller' 
            ? creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES)
            : creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
                filter: (s) => s.structureType == STRUCTURE_WALL
            });

            if (constructionSite == undefined)
            {
                constructionSite = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            }
            
            if (constructionSite != undefined)
            {
                if (creep.build(constructionSite) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(constructionSite);
                }
            }
            else {
                roleUpgrader.run(creep);
            }
        }
        else {     
            let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER &&
                s.store[RESOURCE_ENERGY] > 50
            });
            if (container != null && container != undefined)
            {
                if (creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            }
            else {
                var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                if (creep.harvest(source) == ERR_NOT_IN_RANGE){
                    creep.moveTo(source);                
                }
            }
        }
    }
};