require('prototype.spawn')();
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require('role.repairer');
var roleWaller = require('role.waller');
var roleMiner = require('role.miner');
var roleCourier = require('role.courier');
var roleZergling = require('role.zergling');
var roleClaimer = require('role.claimer');
var roleTerraformer = require('role.terraformer');
var rolePackrat = require('role.packrat');
var roleLinker = require('role.linker');
var roleMinecart = require('role.minecart');
var roleSpawntender = require('role.spawntender');

module.exports.loop = function () {    
    var minHarvesters = 0;
    var minBuilders = 1;  
    var minUpgraders = 1;
    var minRepairers = 2;
    var minCouriers = 1;
    var minPackrats = 0; 
    var minWallers = 0;      
    var minZerglings = 2;
    var minTerraformers = 2;
    var minClaimers = 2;    
    var minMiners = 4;    
    var minLinkers = 1;  
    var minMinecarts = 3;
    var minSpawntenders = 1;
    var numSpawntenders = _.sum(Game.creeps, (c) => c.memory.role == 'spawntender');
    var numLinkers = _.sum(Game.creeps, (c) => c.memory.role == 'linker');
    var numMinecarts = _.sum(Game.creeps, (c) => c.memory.role == 'minecart');
    var numHarvesters = _.sum(Game.creeps, (c) => c.memory.role == 'harvester'); 
    var numMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner'); 
    var numClaimers = _.sum(Game.creeps, (c) => c.memory.role == 'claimer');      
    var numBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'builder');    
    var numUpgraders = _.sum(Game.creeps, (c) => c.memory.role == 'upgrader');    
    var numRepairers = _.sum(Game.creeps, (c) => c.memory.role == 'repairer');
    var numWallers = _.sum(Game.creeps, (c) => c.memory.role == 'waller');   
    var numCouriers = _.sum(Game.creeps, (c) => c.memory.role == 'courier');  
    var numPackrats = _.sum(Game.creeps, (c) => c.memory.role == 'packrat');  
    var numMiners = _.sum(Game.creeps, (c) => c.memory.role == 'miner');
    var numZerglings = _.sum(Game.creeps, (c) => c.memory.role == 'zergling');    
    var numTerraformers = _.sum(Game.creeps, (c) => c.memory.role == 'terraformer');  

    let hostileScan = Game.spawns['Spawn1'].pos.findClosestByPath(FIND_HOSTILE_CREEPS);
    if (hostileScan != undefined)
    {
        minZerglings = minZerglings + 2;
    }
    
    // clear memory
    for (let name in Memory.creeps)
    {
        if (Game.creeps[name] == undefined)
        {
            delete Memory.creeps[name];
        }
    }
    var energy = Game.spawns['Spawn1'].room.energyAvailable - 200;
    var maxEnergy = Game.spawns['Spawn1'].room.energyCapacityAvailable - 200;

    // MIND CONTROL
    for(let name in Game.creeps)
    {        
        var creep = Game.creeps[name];
        if(creep.pos.x < 1 || creep.pos.y < 1 || creep.pos.x > 48 || creep.pos.y > 48){
            creep.moveTo(new RoomPosition(25,25,creep.room.name));
        }
        else if (creep.room.name.indexOf('E90') > -1){
            let foo = new RoomPosition(1,19, 'E91S48');
            creep.moveTo(foo);
        }
        else {        
            if (creep.memory.role == 'upgrader') {
                roleUpgrader.run(creep);
            }
            else if (creep.memory.role == 'harvester') {
                if (energy < maxEnergy) {
                    roleHarvester.run(creep);
                } else {
                    roleBuilder.run(creep);
                }            
            }
            else if (creep.memory.role == 'builder') {
                roleBuilder.run(creep);
            }
            else if (creep.memory.role == 'repairer') {
                roleRepairer.run(creep);
            }
            else if (creep.memory.role == 'waller') {
                if (numCouriers < minCouriers) {
                    roleCourier.run(creep);
                }
                else {
                    roleWaller.run(creep);
                }            
            }
            else if (creep.memory.role == 'miner') {
                roleMiner.run(creep);
            }
            else if (creep.memory.role == 'minecart') {
                roleMinecart.run(creep);
            }
            else if (creep.memory.role == 'courier') {
                roleCourier.run(creep);
            }
            else if (creep.memory.role == 'packrat') {
                rolePackrat.run(creep);
            }
            else if (creep.memory.role == 'linker') {
                roleLinker.run(creep);
            }
            else if (creep.memory.role == 'claimer') {
                roleClaimer.run(creep);
            }
            else if (creep.memory.role == 'zergling') {
                roleZergling.run(creep);
            }
            else if (creep.memory.role == 'spawntender') {
                roleSpawntender.run(creep);
            }
            else if (creep.memory.role == 'terraformer') {
                roleTerraformer.run(creep);
            }
        }
    }    

    if (numSpawntenders === 1) {        
        let spawntender = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS,{
            filter: c => c.memory.role == 'spawntender'
        })[0];
        if (spawntender) {
            if (spawntender.ticksToLive < 150){
                numSpawntenders = 0;
            }
        }
    }
    if (numLinkers === 1){
        let linker = Game.spawns['Spawn1'].room.find(FIND_MY_CREEPS,{
            filter: c => c.memory.role == 'linker'
        })[0];
        if (linker) {
            if (linker.ticksToLive < 90){
                numLinkers = 0;
            }
        }
    }

    console.log('Energy: ' + energy + '/' + maxEnergy 
    + ', Miners: ' + numMiners + '/' + minMiners
    + ', Zerglings: ' + numZerglings + '/'  + minZerglings
    + ', Harvesters: ' + numHarvesters + '/'  + minHarvesters
    + ', Couriers: ' + numCouriers + '/'  + minCouriers
    + ', Minecarts: ' + numMinecarts + '/'  + minMinecarts
    + ', Spawntenders: ' + numSpawntenders + '/'  + minSpawntenders 
    + ', Upgraders: ' + numUpgraders + '/'  + minUpgraders
    + ', Linkers: ' + numLinkers + '/'  + minLinkers
    + ', Repairers: ' + numRepairers + '/'  + minRepairers
    + ', Builders: ' + numBuilders + '/'  + minBuilders
    + ', Wallers: ' + numWallers + '/'  + minWallers
    + ', Claimers: ' + numClaimers + '/'  + minClaimers
    + ', Terraformers: ' + numTerraformers + '/'  + minTerraformers
    + ', Packrats: ' + numPackrats + '/'  + minPackrats
    );
    
    // spawners    
    for(let name in Game.spawns)
    {        
        var spawn = Game.spawns[name];
        var miner = undefined;

        if ((numHarvesters  == 0 && (numCouriers == 0 || numMiners == 0)) &&
        energy > 199)  {
            var creepName = spawn.createCustomCreep(energy,'harvester');
            console.log('Spawning harvester: ' + creepName);
            break;
        }
        if (spawn.spawning == undefined){
            if (numMiners < minMiners && energy > 649) {
                miner = spawn.createMiner();
                console.log('Spawning miner: ' + miner);
                break;
            }

            if (energy == maxEnergy)
            {            
                var creepRole = 'none';                       
                
                if (numHarvesters < minHarvesters) {
                    creepRole = 'harvester';
                }
                else if (numLinkers < minLinkers && numCouriers > 0 && numMinecarts > 1) {
                    creepRole = 'linker';
                }   
                else if (numSpawntenders < minSpawntenders && numCouriers > 0 && numMinecarts > 1) {
                    var creepName = spawn.createSpawntender(energy);
                    console.log('Spawning spawntender: ' + creepName);
                    break;
                }
                else if (numZerglings < minZerglings && numMinecarts > 1 && numCouriers > 0  && !(numZerglings < minZerglings)) {
                    zergling = spawn.createZergling(energy);
                    console.log('Spawning Zergling: ' + zergling);
                    break;
                }
                else if (numCouriers < minCouriers) {
                    var creepName = spawn.createCourier(energy);
                    console.log('Spawning courier: ' + creepName);
                    break;
                }
                else if (numMinecarts < minMinecarts) {
                    var creepName = spawn.createMinecart(energy);
                    console.log('Spawning minecart: ' + creepName);
                    break;
                }          
                else if (numZerglings < minZerglings) {
                    zergling = spawn.createZergling(energy);
                    console.log('Spawning Zergling: ' + zergling);
                    break;
                }
                else if (numRepairers < minRepairers) {
                    creepRole = 'repairer';
                }   
                else if (numUpgraders < minUpgraders) {
                    var creepName = spawn.createUpgrader(energy);
                    console.log('Spawning upgrader: ' + creepName);
                    break;
                }                       
                else if (numPackrats < minPackrats) {
                    var creepName = spawn.createPackrat(energy);
                    console.log('Spawning packrat: ' + creepName);
                    break;
                }                     
                else if (numBuilders < minBuilders) {
                    creepRole = 'builder';
                }            
                else if (numWallers < minWallers) {
                    creepRole = 'waller';
                }
                else if (numClaimers < minClaimers && energy > 1299) {
                    var creepName = spawn.createClaimer();
                    console.log('Spawning claimer: ' + creepName);
                    break;
                }  
                else if (numTerraformers < minTerraformers) {
                    creepRole = 'terraformer';
                }
                if (creepRole !== 'none') {
                    var creepName = spawn.createCustomCreep(energy,creepRole);            
                    console.log('Spawning ' + creepRole + ': ' + creepName);
                }
            }
        }
    }

    //towers
    var towers = _.filter(Game.structures, s => s.structureType == STRUCTURE_TOWER);

    for (let tower of towers)
    { 
        var target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(target != undefined)
        {
            tower.attack(target);
        }
        else {
            target = tower.pos.findClosestByRange(FIND_MY_CREEPS, c => c.hits < c.hitsMax);
            tower.heal(target);
        }
    }

    const linkFrom = Game.rooms['E94S49'].lookForAt('structure', 7, 18)[1];
    const linkTo = Game.rooms['E94S49'].lookForAt('structure', 30, 30)[0];
    linkFrom.transferEnergy(linkTo);
}