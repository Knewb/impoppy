var rolePackrat = require('role.packrat');
module.exports = {
    run: function(creep){
        let linker = creep.room.find(FIND_MY_CREEPS,{
            filter: c => c.memory.role == 'linker'
        })[0];
        if (!linker){
            rolePackrat.run(creep);
        }
            else {
            if (creep.memory.working == true && creep.carry.energy == 0 ||
            (creep.room.energyAvailable == creep.room.energyCapacityAvailable &&
            creep.carry.energy < (creep.carryCapacity * 0.75))) {
                creep.memory.working = false;            
            }
            else if (creep.memory.working == false && creep.carry.energy > 500) {            
                creep.memory.working = true;          
            }
            if (creep.memory.working == true) { // deliver energy            
                var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN || 
                    s.structureType == STRUCTURE_EXTENSION)
                    && s.energy < s.energyCapacity                               
                });        
                var energy = creep.room.energyAvailable;
                var maxEnergy = creep.room.energyCapacityAvailable;
                if (energy == maxEnergy) {
                    structure = Game.getObjectById('5922d2ed93c971d64ac8c886');
                    if (creep.transfer(structure,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(structure);
                    }
                }
                else if (creep.transfer(structure,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo(structure);
                }
            }
            else { // go find energy    
                const link = Game.getObjectById('5922818cf21fdd9a717dde94');
                if (link) {
                    if (creep.withdraw(link,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(link);
                    }               
                }
            }    
        }
    }   
};
