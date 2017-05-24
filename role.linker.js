module.exports = {
    run: function(creep){
        // let post = creep.memory.post;
        // let pos1 = post.substring(0,post.indexOf(","));
        // let pos2 = post.substring(post.indexOf(","));
        let pos = new RoomPosition(6,18,creep.room.name);        

        if (creep.pos.isEqualTo(pos)){
            let container = creep.pos.findInRange(FIND_STRUCTURES,1,{
                filter: s=> s.structureType == STRUCTURE_CONTAINER &&
                s.store[RESOURCE_ENERGY] > 100
            })[0];
            let link = creep.pos.findInRange(FIND_STRUCTURES,1,{
                filter: s=> s.structureType == STRUCTURE_LINK &&
                s.energy < s.energyCapacity
            })[0];
            if (container != null){
                creep.withdraw(container,RESOURCE_ENERGY);                
            }            
            if (link != null){
                creep.transfer(link,RESOURCE_ENERGY);
            }
        }
        else {            
            creep.moveTo(pos);
        }
    }
};