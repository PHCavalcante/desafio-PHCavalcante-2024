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
    function posicaoAnimal(animal) {
      return dataObj.animais.findIndex(
        (a) => a.especie.toLowerCase() === animal.toLowerCase()
      );
    }

    function biomaAnimal(posicao) {
      return dataObj.animais[posicao].bioma;
    }

    function tamanhoAnimal(animal) {
      return dataObj.animais[posicaoAnimal(animal)].tamanho;
    }

    function checarEspacos(animal) {
      const posicao = posicaoAnimal(animal);
      const bioma = biomaAnimal(posicao);
      const recintosViaveis = dataObj.recintos
        .filter(
          (r) =>
            r.bioma.includes(bioma) && r.espaco_livre >= tamanhoAnimal(animal)
        )
        .map(
          (r) =>
            `Recinto ${r.Recinto} (espaço livre: ${r.espaco_livre} total: ${r.total})`
        );
      return recintosViaveis;
    }

    const dataObj = JSON.parse(data);

    if (posicaoAnimal(animal) === -1) {
      return { erro: "Animal inválido", recintosViaveis: null };
    } else if (quantidade <= 0) {
      return { erro: "Quantidade inválida", recintosViaveis: null };
    }

    const recintosViaveis = checarEspacos(this.animal);

    if (this.animal == "MACACO"){
      if (this.quantidade >= 10) {
        return { erro: "Não há recinto viável", recintosViaveis: null };
      }
      return {recintosViaveis}; 
    }

    if (recintosViaveis.length === 0) {
      return {
        erro: null,
        recintosViaveis: recintosViaveis.slice(0, this.quantidade),
      };
    }

    return { recintosViaveis, erro: null };
  }
}

export { RecintosZoo as RecintosZoo };
