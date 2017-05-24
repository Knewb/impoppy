module.exports = function() {
    StructureSpawn.prototype.createCustomCreep =
        function(energy,roleName){
            var numParts = Math.floor((energy - 100) / 200);
            var remainder = Math.floor((energy - (numParts * 200)) / 50);
            
            var body = [];
            // if (remainder > 1) {
            //     body.push(WORK);
            //     remainder = remainder - 2;
            // }
            for (let i = 0; i < numParts;i++) {
                body.push(WORK);
            }
            for (let i = 0; i < numParts;i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numParts;i++) {
                body.push(MOVE);
            }
            for (let i = 0; i < remainder-1;i++) {
                body.push(MOVE);
            }
            if (roleName == 'waller') {
                return this.createCreep(body,undefined,{role:roleName,working:false,repairTargetId:'0'});
            }
            else {
                return this.createCreep(body,undefined,{role:roleName,working:false});
            }
        };
    StructureSpawn.prototype.createMiner =
        function(){
            return this.createCreep([WORK,WORK,WORK,WORK,WORK,MOVE,MOVE,MOVE],undefined,{role:'miner'});
        }
    StructureSpawn.prototype.createCourier =
        function(energy){
            var numParts = Math.floor(energy / 100);
            var remainder = energy - (numParts * 100);
            var body = [];
            for (let i = 0; i < numParts;i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numParts;i++) {
                body.push(MOVE);
            }
            if (remainder > 49)
            {
                body.push(MOVE);
            }
            return this.createCreep(body,undefined,{role:'courier', working:false});
        };
    StructureSpawn.prototype.createMinecart =
        function(energy){
            var numParts = Math.floor(energy / 100);
            var remainder = energy - (numParts * 100);
            var body = [];
            for (let i = 0; i < numParts;i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numParts;i++) {
                body.push(MOVE);
            }
            if (remainder > 49)
            {
                body.push(MOVE);
            }
            return this.createCreep(body,undefined,{role:'minecart', working:false});
        };
    StructureSpawn.prototype.createSpawntender =
        function(energy){
            var numParts = Math.floor(energy / 100);
            var remainder = energy - (numParts * 100);
            var body = [];
            for (let i = 0; i < numParts;i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numParts;i++) {
                body.push(MOVE);
            }
            if (remainder > 49)
            {
                body.push(MOVE);
            }
            return this.createCreep(body,undefined,{role:'spawntender', working:false});
        };
    StructureSpawn.prototype.createPackrat =
        function(energy){
            var numParts = Math.floor(energy / 100);
            var remainder = energy - (numParts * 100);
            var body = [];
            for (let i = 0; i < numParts;i++) {
                body.push(CARRY);
            }
            for (let i = 0; i < numParts;i++) {
                body.push(MOVE);
            }
            if (remainder > 49)
            {
                body.push(MOVE);
            }
            return this.createCreep(body,undefined,{role:'packrat', working:false,pack:false});
        };
    StructureSpawn.prototype.createZergling =
        function(energy){
            var numParts = Math.floor((energy - 150) / 150);
            var body = [];
            for (let i = 0; i < 10;i++) {
                body.push(TOUGH);
            }
            body.push(MOVE);body.push(MOVE);
            for (let i = 0; i < numParts;i++) {
                body.push(ATTACK);
                body.push(MOVE);
            }
            return this.createCreep(body,undefined,{role:'zergling', aggro:false});
        }
    StructureSpawn.prototype.createClaimer =
        function(){
            return this.createCreep([CLAIM,CLAIM,MOVE,MOVE],undefined,{role:'claimer'});
        }
    StructureSpawn.prototype.createUpgrader =
        function(energy){
            var numParts = Math.floor((energy - 300) / 100);
            var body = [];
            for (let i = 0; i < numParts;i++) {
                body.push(WORK);
            }
            body.push(CARRY);
            body.push(CARRY);   
            body.push(CARRY);       
            body.push(MOVE);   
            body.push(MOVE);   
            body.push(MOVE);        
            // return this.createCreep([WORK,CARRY,MOVE],undefined,{role:'upgrader', working:false});
            return this.createCreep(body,undefined,{role:'upgrader', working:false});
        }
};