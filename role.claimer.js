module.exports = {
    run: function(creep){  
        if(creep.room.controller.owner == undefined) {
            if (creep.claimController(creep.room.controller) == ERR_GCL_NOT_ENOUGH)
            {
                let claimbro = creep.room.controller.pos.findInRange(FIND_MY_CREEPS,1, {
                    filter: c => c.name != creep.name
                })[0];
                
                if (claimbro) {                      
                    let exit = creep.pos.findClosestByPath(FIND_EXIT_LEFT);
                    creep.moveTo(exit);
                }
                else if (creep.reserveController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller);
                }
            }
            else if (creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }                
        }
        else {                
            const exit = creep.pos.findClosestByRange(FIND_EXIT_LEFT);
            creep.moveTo(exit);
        }
    }
};