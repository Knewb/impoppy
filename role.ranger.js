var roleBuilder = require('role.builder');
module.exports = {
    run: function(creep){
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {            
            creep.memory.working = true;
        }
        if (creep.memory.working == true) { 
            
            var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL
            });
            if (structure != undefined) {
                creep.repair(structure);
            }
            var site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            if (site != undefined && creep.room.name != 'E94S49') {
                roleBuilder.run(creep);
            }
            else {
                if (creep.room.name != 'E94S49'){      
                    let exit = creep.pos.findClosestByRange(FIND_EXIT_RIGHT);
                    if (exit == null)
                    {
                        exit = creep.pos.findClosestByRange(FIND_EXIT_BOTTOM);
                    }
                    if (creep.room.name == 'E93S49')
                    {
                        exit = new RoomPosition(1,15,'E94S49');
                    }                                     
                    creep.moveTo(exit);
                }
                else{
                    var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER &&
                        s.store[RESOURCE_ENERGY] < s.storeCapacity
                    });
                    if (structure == null) {
                        structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: s => s.structureType == STRUCTURE_STORAGE
                        });
                    }
                        if (creep.transfer(structure,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE)
                        {
                            creep.moveTo(structure);
                        }
                }
            }        
                        
            // var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            //     filter: (s) => s.structureType == STRUCTURE_CONTAINER        
            // })            
            // if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            //     creep.moveTo(structure);
            // }             
        }
        else { // find energy, no matter what                             
            if (creep.room.name === 'E94S49'){
                creep.moveTo(new RoomPosition(48,11,'E93S49'));
            }     
            else{                
                var energy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);

                if (energy != undefined && energy.amount > 0){
                    if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(energy);
                    }
                } 
                else {
                    if (creep.ticksToLive < 300 && creep.room.name.indexOf('E91') > -1) {
                        creep.memory.working = true;
                    }
                    if (creep.room.controller != null && creep.room.controller.owner === undefined){                    
                        var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);                        
                        if (source == null || 
                        (creep.harvest(source) == ERR_NOT_IN_RANGE &&
                        source.energy < 400 && source.ticksToRegeneration > 20))
                        {                            
                            let exit = creep.pos.findClosestByRange(FIND_EXIT_LEFT);
                            if (creep.room.name.indexOf('E91') > -1) {                                
                                exit = creep.pos.findClosestByRange(FIND_EXIT_TOP);
                            }
                            creep.moveTo(exit);
                        }
                        else if (creep.harvest(source) == ERR_NOT_IN_RANGE){
                            creep.moveTo(source);
                        }
                    }
                }
            }    
        }   
    }
};
