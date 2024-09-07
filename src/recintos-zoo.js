class RecintosZoo {
  analisaRecintos(animal, quantidade) {
    this.animal = animal;
    this.quantidade = quantidade;

    let data = `
    {
        "recintos": [
            {"Recinto": 1, "bioma" : "savana", "espaco_livre": 7, "total": 10, "animais_existentes": "3 macacos"},
            {"Recinto": 2, "bioma" : "floresta", "espaco_livre": 5, "total": 5, "animais_existentes": "vazio"},
            {"Recinto": 3, "bioma" : "savana e rio", "espaco_livre": 6, "total": 7, "animais_existentes": "1 gazela"},
            {"Recinto": 4, "bioma" : "rio", "espaco_livre": 8, "total": 8, "animais_existentes": "vazio"},
            {"Recinto": 5, "bioma" : "savana", "espaco_livre": 8, "total": 9, "animais_existentes": "1 leão"}
        ],
        "animais": [
            {"especie": "LEAO", "tamanho": 3, "bioma": "savana", "carnivoro" : true},
            {"especie": "LEOPARDO", "tamanho": 2, "bioma": "savana", "carnivoro" : true},
            {"especie": "CROCODILO", "tamanho": 3, "bioma": "rio", "carnivoro" : true},
            {"especie": "MACACO", "tamanho": 1, "bioma": "savana ou floresta", "carnivoro" : false},
            {"especie": "GAZELA", "tamanho": 2, "bioma": "savana", "carnivoro" : false},
            {"especie": "HIPOPOTAMO", "tamanho": 4, "bioma": "savana ou rio", "carnivoro" : false}
        ]
    }`;
    const dataObj = JSON.parse(data);
    // console.log(dataObj);
    if (!dataObj.animais.includes(animal)) {
      console.log(`{ erro: "Animal inválido" }`);
      return { erro: "Animal inválido" };
    } else if (quantidade <= 0) {
      console.log("Quantidade inválida");
      return { erro: "Quantidade inválida" };
    }
    function posicaoAnimal(animal) {
      return dataObj.animais.especie.indexOf(animal);
    }
    function biomaAnimal(posicao) {
      return dataObj.animais[posicao].bioma;
    }
    function tamanhoAnimal(animal) {
      return dataObj.animais[posicaoAnimal(animal)].tamanho;
    }
    function checarCarnivoro(animal) {
      return dataObj.animais[posicaoAnimal(animal)].carnivoro;
    }
    function checarAnimaisnoRecinto(animal) {
      // acho que isso ta errado
      return dataObj.recintos[dataObj.animais[posicaoAnimal()]];
    }
    function checarEspacoTotal(animal) {
      const posicao = posicaoAnimal(animal);
      const bioma = biomaAnimal(posicao);
      return dataObj.recintos[dataObj.recintos.indexOf(bioma)].total;
    }
    function checarEspaco(animal) {
      const posicao = posicaoAnimal(animal);
      const bioma = biomaAnimal(posicao);
      return dataObj.recintos[dataObj.recintos.indexOf(bioma)].espaco_livre;
    }
    function gerenciadorDeRecintosViaveis(animal, quantidade) {
      if (
        tamanhoAnimal(animal) > checarEspaco(animal) ||
        checarEspaco(animal) == 0
      ) {
        console.log("Não há recinto viável");
        return "Não há recinto viável";
      }
      if (checarCarnivoro(animal)) {
        for (let i = 0; i <= dataObj.recintos.length; i++) {
          if (
            i.endsWith(animal) &&
            checarEspaco(animal >= tamanhoAnimal(animal))
          ) {
            dataObj.recintos.push({
              ...dataObj,
              animais_existentes: `${quantidade} + ${animal}`,
            });
          }
        }
      } else if (animal == "MACACO") {
        if (
          checarEspaco(animal) != "vazio" &&
          tamanhoAnimal(animal) +
            checarEspaco(animal < checarEspacoTotal(animal))
        ) {
          dataObj.recintos.push({
            ...dataObj, animais_existentes: `${quantidade} + ${animal}`
          })
        } else {
            console.log("Não há recinto viáve");
            return { erro: "Não há recinto viáve"};
        }
      }
    }
  }
}

// apenas para testar //
const resultado = new RecintosZoo().analisaRecintos("chimpaze", 2);

export { RecintosZoo as RecintosZoo };
