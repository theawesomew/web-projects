function GeneticAlgorithm (max, top) {
	this.max_units = max;
	this.top_units = top;

	this.sf = 200;

	if (this.max_units < this.top_units) {
		this.top_units = this.max_units;
	}

	this.reset = function () {
		this.iteration = 1;
		this.mutateRate = 1;

		this.best_population = 0;
		this.best_fitness = 0;
		this.best_score = 0;
	}

	this.createPopulation = function () {
		this.population = [];

		for (var i = 0; i < this.max_units; i++) {
			var newUnit = new synaptic.Architect.Perceptron(4,6,1);

			newUnit.index = i;
			newUnit.fitness = 0;
			newUnit.score = 0;
			newUnit.isWinner = false;

			this.population.push(newUnit);
		}
	}

	this.activateBrain = function (bird, pipe) {
		var verticalDistanceTop = this.normalise((bird.y - (pipe.y+80)),400) * this.sf;
		var verticalDistanceBottom = this.normalise((bird.y - pipe.y), 400) * this.sf;
		var birdVelocity = this.normalise(bird.velocity,10) * this.sf;
		var horizontalDistance = this.normalise((bird.x - pipe.x),500) * this.sf;

		var inputs = [verticalDistanceTop, verticalDistanceBottom, birdVelocity, horizontalDistance];

		var outputs = this.population[bird.index].activate(inputs);

		if (outputs[0] > 0.5) {
			bird.jump();
		}
	}
	
	this.evolvePopulation = function () {
		var winners = this.selection();
		
		if (this.mutateRate == 1 && winners[0] < 0) {
			this.createPopulation();
		} else {
			this.mutateRate = 0.2;
		}
		
		for (var i = this.top_units; i < this.max_units; i++) {
			var parentA, parentB, offspring;
			
			if (i === this.top_units) {
				parentA = winners[0].toJSON();
				parentB = winners[1].toJSON();
				offspring = this.crossOver(parentA, parentB);
			} else if (i < this.max_units-2) {
				parentA = this.getRandomUnit(winners).toJSON();
				parentB = this.getRandomUnit(winners).toJSON();
				offspring = this.crossOver(parentA, parentB);
			} else {
				offspring = this.getRandomUnit(winners).toJSON();
			}
			
			offspring = this.mutation(offspring);
			
			var newUnit = synaptic.Network.fromJSON(offspring);
			newUnit.index = this.population[i].index;
			newUnit.fitness = 0;
			newUnit.score = 0;
			newUnit.isWinner = false;
			
			this.population[i] = newUnit;
		}
	}
	
	this.selection = function () {
		var sortedPopulation = this.population.sort(function (a,b){
			return b.fitness - a.fitness;
		});
		
		
		for (var i = 0; i < this.top_units; i++) {
			this.population[i].isWinner = true;
		}
		
		return sortedPopulation.slice(0, this.top_units);
	}
	
	this.crossOver = function (parentA, parentB) {
		var cutPoint = this.random(0, parentA.neurons.length-1);
		
		for (var i = cutPoint; i < parentA.neurons.length; i++) {
			var biasFromParentA = parentA.neurons[i]['bias'];
			parentA.neurons[i]['bias'] = parentB.neurons[i]['bias'];
			parentB.neurons[i]['bias'] = biasFromParentA;
		}
		
		return this.random(0,1) == 1 ? parentA : parentB;
	}
	
	this.mutation = function (offspring) {
		for (var i = 0; i < offspring.neurons.length; i++) {
			offspring.neurons[i]['bias'] = this.mutate(offspring.neurons[i]['bias']);
		}
		
		for (var i = 0; i < offspring.connections.length; i++) {
			offspring.connections[i]['weight'] = this.mutate(offspring.connections[i]['weight']);
		}
		
		return offspring;
	}
	
	this.mutate = function (gene) {
		if (Math.random() < this.mutateRate) {
			var mutateFactor = 1 + ((Math.random()-0.5)*3+(Math.random()-0.5));
			gene *= mutateFactor
		}
		
		return gene;
	}
	
	this.random = function (min, max) {
		return Math.floor(Math.random() * (max-min+1) + min)	
	}
	
	this.getRandomUnit = function (array) {
		return array[this.random(0, array.length-1)];
	}
	
	this.normalise = function (value, max) {
		if (value < -max) {
			value = -max;
		} else if (value > max) {
			value = max;
		}
		
		return (value/max);
	}
}