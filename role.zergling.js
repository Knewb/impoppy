var roleBuilder = require('role.builder');

module.exports = {
    run: function(creep){
        if (creep.memory.aggro === true && 
            Game.spawns['Spawn1'].memory.attack === false) {
            creep.memory.aggro = false;
        }
        else if (creep.memory.aggro === false && 
            Game.spawns['Spawn1'].memory.attack === true) {
            creep.memory.aggro = true;
        }
        if (creep.memory.aggro === true) {             
            let tower = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES,{
                filter: s => s.structureType == STRUCTURE_TOWER
            });       
            let target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS);
            let hostileStructure = creep.pos.findClosestByPath(FIND_HOSTILE_STRUCTURES,{
                filter: s => s.structureType != STRUCTURE_CONTROLLER
            });
            let hostileWall = creep.pos.findClosestByPath(FIND_STRUCTURES,{
                filter: s => s.structureType == STRUCTURE_WALL &&
                s.hits > 0 && s.hits < 100
            });
            if (tower) {
                if (creep.attack(tower) == ERR_NOT_IN_RANGE){
                    creep.moveTo(tower);
                }
            }
            else if (target){                
                if (target != undefined) {
                    if (creep.attack(target) == ERR_NOT_IN_RANGE){
                        creep.moveTo(target);
                    }
                }                
            }
            else if (hostileStructure){
                if (creep.attack(hostileStructure) == ERR_NOT_IN_RANGE){
                    creep.moveTo(hostileStructure);
                }
            }
            else if (hostileWall){
                if (creep.attack(hostileWall) == ERR_NOT_IN_RANGE){
                    creep.moveTo(hostileWall);
                }
            }
            else{                
                let exit = creep.pos.findClosestByRange(FIND_EXIT_LEFT);
                if (creep.room.name.indexOf('E91') > -1) {                                
                    exit = creep.pos.findClosestByRange(FIND_EXIT_TOP);
                }
                if (creep.room.name == 'E91S46')
                {
                    exit = creep.pos.findClosestByRange(FIND_EXIT_RIGHT);
                } 
                if (creep.room.name == 'E92S46')
                {
                    exit = creep.pos.findClosestByRange(FIND_EXIT_BOTTOM);
                }            
                if (creep.room.name == 'E92S47')
                {
                    exit = creep.pos.findClosestByRange(FIND_EXIT_RIGHT);
                }  
                if (creep.room.name == 'E92S48')
                {
                    exit = creep.pos.findClosestByRange(FIND_EXIT_TOP);
                }    
                if (creep.room.name == 'E93S48')
                {
                    exit = creep.pos.findClosestByRange(FIND_EXIT_LEFT);
                }   
                if (creep.room.name == 'E93S47')
                {
                    exit = creep.pos.findClosestByRange(FIND_EXIT_TOP);
                }   
                if (creep.room.name == 'E93S46')
                {
                    exit = creep.pos.findClosestByRange(FIND_EXIT_RIGHT);
                }  
                creep.moveTo(exit);                
            }
        }
        else {        
            let exit = creep.pos.findClosestByRange(FIND_EXIT_RIGHT);
            if (creep.room.name != 'E94S49'){ 
                if (creep.room.name == 'E91S46'){
                    exit = creep.pos.findClosestByRange(FIND_EXIT_BOTTOM);
                }                                    
                if (exit == null)
                {
                    exit = creep.pos.findClosestByRange(FIND_EXIT_BOTTOM);
                }
                if (creep.room.name == 'E93S49')
                {
                    exit = new RoomPosition(2,15,'E94S49');
                }    
                                        
                creep.moveTo(exit);                
            }
            else {
                creep.moveTo(Game.spawns['Spawn1'].pos);
                let target = creep.pos.findClosestByPath(FIND_HOSTILE_CREEPS)
                if (target !== undefined)
                {
                    if (creep.attack(target) == ERR_NOT_IN_RANGE){
                        creep.moveTo(target);
                    }
                }     
            }       
        }    
    }
};