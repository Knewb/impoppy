module.exports = {
    run: function(creep){ 
            let sources = creep.room.find(FIND_SOURCES);
            let cont = creep.pos.findClosestByRange(FIND_STRUCTURES,{
                filter: s => s.structureType === STRUCTURE_CONTAINER
            });
            let notpos = new RoomPosition(6,18,creep.room.name); 
            if (!cont.pos.isEqualTo(creep.pos) || creep.pos.isEqualTo(notpos)){
                var source = null;
                let sourceFound = false;
                for (let s in sources){
                    let minebro = sources[s].pos.findInRange(FIND_MY_CREEPS,2,{
                        filter: c=> c.memory.role == 'miner' &&
                        c.name != creep.name
                    })[0];
                    
                    if (minebro != undefined)
                    {
                        continue;
                    }
                    else {                    
                        source = sources[s];                  
                        sourceFound = true;
                        break;
                    }
                }
                if (sourceFound != null && source != null) {                                
                    let container = source.pos.findInRange(FIND_STRUCTURES,1,{
                        filter: s=> s.structureType == STRUCTURE_CONTAINER
                    })[0];

                    if (container){
                        if (creep.pos.isEqualTo(container.pos)){
                            creep.harvest(source);
                        }
                        else {
                            creep.moveTo(container);                    
                        }
                    }
                    else {
                        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {
                            creep.moveTo(source);
                        }
                    }
                }
                else {
                    if (creep.room.name === 'E94S49'){
                        creep.moveTo(new RoomPosition(48,11,'E93S49'));
                    }
                    else {
                        let exit = creep.pos.findClosestByRange(FIND_EXIT_LEFT);
                        if (creep.room.name.indexOf('E91') > -1) {                                
                            exit = creep.pos.findClosestByRange(FIND_EXIT_TOP);
                        }
                        creep.moveTo(exit);
                    }     
                }
        }
        else {
            let source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            creep.harvest(source);
        }
    }
};