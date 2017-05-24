module.exports = {
    run: function(creep){
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
            if (creep.memory.containerId == undefined || creep.memory.containerId == '0')
            {
                // Get a list of containers in the room
                var containers = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_CONTAINER
                    && s.store[RESOURCE_ENERGY] > 600
                });
                if (containers != null && containers.length > 0){      
                    // figure out which container has the most energy, and assign yourself to it via memory                          
                    var structure = containers[0]; 
                    creep.memory.containerId = structure.id;
                    for (let i in containers)
                    {
                        if (containers[i].store[RESOURCE_ENERGY] == 2000 || 
                            containers[i].store[RESOURCE_ENERGY] > structure.store[RESOURCE_ENERGY])
                        {
                            structure = containers[i];
                            creep.memory.containerId = containers[i].id;
                        }
                    }
                }
            }
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {            
            creep.memory.working = true;
            creep.memory.containerId = '0';            
        }
        if (creep.memory.working == true) { // deliver energy
            if (creep.room.name != 'E94S49')
            {
                creep.moveTo(new RoomPosition(2,15,'E94S49'));
            }
            else {
                var structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_CONTAINER)
                    && s.store[RESOURCE_ENERGY] < s.storeCapacity
                });

                //If spawns/extensions/towers/links are full, dump energy in storage by controller for upgraders to use            
                if (structure == null)
                {
                    structure = Game.getObjectById('59201aacbf69622dfc602bce');
                }

                if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(structure);
                }     
            }        
        }
        else { // go find energy     
            if (creep.room.name === 'E94S49'){
                creep.moveTo(new RoomPosition(48,11,'E93S49'));
            }
            else {                     
                // Look for large amounts of dropped energy first
                var energy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
                if (energy != undefined && energy.amount > 500){
                    if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(energy);
                    }
                } 
                else if (creep.memory.containerId != '0') {      
                    // If no dropped energy, go find your assigned container         
                    var structure = Game.getObjectById(creep.memory.containerId);
                    if (structure && structure.id == '591dcb8a0e14f29431d8d237'){
                        structure = undefined;
                    }
                    if (structure == undefined || structure.store[RESOURCE_ENERGY] == 0)
                    {
                        // if assigned container is unavailable, find the nearest container
                        let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: s => s.structureType == STRUCTURE_CONTAINER &&
                            s.store[RESOURCE_ENERGY] > 300
                        });

                        if (creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container);
                        }
                    }
                    if (structure != undefined && structure.store[RESOURCE_ENERGY] > (creep.carryCapacity - creep.carry.energy - 100)) {                    
                        if (creep.withdraw(structure,RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                            creep.moveTo(structure);
                        }
                    }    
                    else {
                        if (creep.room.name === 'E94S49'){
                            creep.moveTo(new RoomPosition(48,11,'E93S49'));
                        }
                        // else {
                        //     let exit = creep.pos.findClosestByRange(FIND_EXIT_LEFT);
                        // if (creep.room.name.indexOf('E91') > -1) {                                
                        //     exit = creep.pos.findClosestByRange(FIND_EXIT_TOP);
                        // }
                        //     creep.moveTo(exit);
                        // }   
                    }            
                }
                else {
                    // if no assigned container, find nearest container
                    let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER &&
                        s.store[RESOURCE_ENERGY] > 300 &&
                        s.id != '591dcb8a0e14f29431d8d237'
                    });

                    if (container) {
                        if (creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(container);
                        }
                    }
                    else {
                        if (creep.room.name === 'E94S49'){
                            creep.moveTo(new RoomPosition(48,11,'E93S49'));
                        }
                        // else {
                        //     let exit = creep.pos.findClosestByRange(FIND_EXIT_LEFT);
                        // if (creep.room.name.indexOf('E91') > -1) {                                
                        //     exit = creep.pos.findClosestByRange(FIND_EXIT_TOP);
                        // }
                        //     creep.moveTo(exit);
                        // }   
                    }
                }
            }
        }    
    }   
};
