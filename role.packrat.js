module.exports = {
    run: function(creep){
        if (creep.memory.working == true && creep.carry.energy == 0) {
            creep.memory.working = false;
            if (creep.memory.containerId == undefined || creep.memory.containerId == '0')
            {
                creep.memory.pack = false;
                // Get a list of containers in the room
                var containers = creep.room.find(FIND_STRUCTURES, {
                    filter: (s) => s.structureType == STRUCTURE_CONTAINER
                    && s.store[RESOURCE_ENERGY] > 0
                });
                if (containers.length > 0){      
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
                    if (structure.store[RESOURCE_ENERGY] > 1600)
                    {
                        creep.memory.pack = true;
                    }
                }
            }
        }
        else if (creep.memory.working == false && creep.carry.energy == creep.carryCapacity) {            
            creep.memory.working = true;
            creep.memory.containerId = '0'                        
        }
        if (creep.memory.working == true) { // deliver energy
            // Fill towers first, then extensions and spawn
            var structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_TOWER
                && s.energy < s.energyCapacity                               
            });
            if (!structure){                
                structure = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
                    filter: (s) => (s.structureType == STRUCTURE_SPAWN || 
                    s.structureType == STRUCTURE_EXTENSION)
                    && s.energy < s.energyCapacity                               
                });
            }

            //structure = Game.getObjectById('591dcb8a0e14f29431d8d237'); // fill middle container for builders to use

            // If spawns/extensions/towers are full, dump energy in storage by controller for upgraders to use            
            if (structure == null || creep.memory.pack === true)
            {
                structure = Game.getObjectById('59201aacbf69622dfc602bce');
            }
            if (creep.transfer(structure, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(structure);
            }             
        }
        else { // go find energy              
            // Look for large amounts of dropped energy first
            var energy = creep.pos.findClosestByPath(FIND_DROPPED_ENERGY);
            if (creep.memory.pack === false && energy != undefined && energy.amount > 50){
                if (creep.pickup(energy) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(energy);
                }
            }        
            else if (creep.memory.containerId != '0') {      
                // If no dropped energy, go find your assigned container         
                var structure = Game.getObjectById(creep.memory.containerId);
                if (structure == undefined || structure.store[RESOURCE_ENERGY] == 0)
                {
                    // if assigned container is unavailable, find the nearest container
                    let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: s => s.structureType == STRUCTURE_CONTAINER &&
                        s.store[RESOURCE_ENERGY] > 0
                    });
                    

                    if (creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(container);
                    }
                }
                if (structure != undefined && structure.store[RESOURCE_ENERGY] > 0) {                    
                    if (creep.withdraw(structure,RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                        creep.moveTo(structure);
                    }
                }
            }
            else {
                // if no assigned container, find nearest container
                let container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: s => s.structureType == STRUCTURE_CONTAINER &&
                s.store[RESOURCE_ENERGY] > 0
                });            

                if (creep.withdraw(container,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            }
           
        }    
    }   
};
