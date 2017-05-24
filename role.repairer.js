var roleBuilder = require('role.builder');

module.exports = {
    run: function(creep){
        if(creep.pos.x*creep.pos.y === 0 || creep.pos.x === 49 || creep.pos.y === 49){
            if (creep.room.name == 'E94S49'){
                creep.moveTo(new RoomPosition(49,13,'E94S49'));
            }
            else {
                creep.moveTo(new RoomPosition(25,25,creep.room.name));
            }
        }
        else
        {
            if (creep.memory.working == true && creep.carry.energy == 0) {
                creep.memory.working = false;
            }
            else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {            
                creep.memory.working = true;
            }
            let repairbro = creep.room.find(FIND_MY_CREEPS,{
                filter: c => c.memory.role == 'repairer'
                && c.name != creep.name
            })[0];
            
            if (repairbro == null || repairbro.ticksToLive < creep.ticksToLive) {
                
                if (creep.memory.working == true) {                           
                    var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (s) => s.hits < s.hitsMax && s.structureType != STRUCTURE_WALL &&
                        s.structureType != STRUCTURE_RAMPART
                    });
                    if (structure != undefined) {
                        if (creep.repair(structure) == ERR_NOT_IN_RANGE) {
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

                    // var source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
                    // if (creep.harvest(source) == ERR_NOT_IN_RANGE){
                    //     creep.moveTo(source);
                    // }
                }    
            }
            else {
                if (creep.room.name === 'E94S49') {
                    let exit = creep.pos.findClosestByRange(FIND_EXIT_LEFT);
                    creep.moveTo(exit);
                }
                else {
                    let exit = creep.pos.findClosestByRange(FIND_EXIT_RIGHT);
                    creep.moveTo(exit);
                }
            }
        }
    }
};