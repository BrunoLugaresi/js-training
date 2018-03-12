import { promiseDef, simplePromise } from './promises';

test('promises def', () => {

    expect(promiseDef).toBeDefined();
    expect(promiseDef.definicoes[0]).toEqual('#mozilla =>A Promise is an object representing the eventual completion or failure of an asynchronous operation');
    expect(promiseDef.definicoes[1]).toEqual('#eduardo => Simboliza algo que vai acontecer no futuro, porém isso pode dar certo ou não');

    expect(promiseDef.vantagens[0]).toEqual('O encadeamento é garantido pelo tipo, e não por callbacks');
    expect(promiseDef.vantagens[1]).toEqual('Tratamento de erros simplificado');
    expect(promiseDef.vantagens[2]).toEqual('Mais fácil de ler e manter o código');
    expect(promiseDef.vantagens[3]).toEqual('Favorece composição do seu código #não garante');

    expect(promiseDef.desvantagens[0]).toEqual('Retorna somente um valor e o seu ciclo de vida acaba (RxJS)');
    expect(promiseDef.desvantagens[1]).toEqual('Não é cancelável (RxJS)');

    expect(promiseDef.observacoes[0]).toEqual('Normalmente nós somos consumidores das promises (fetch, jQuery, middlewares, etc)');
});

/**
 * Fazer junto
 */
test('simple promise chaining', (done) => {
    
    simplePromise('valor')
       .then(v => console.log('Meu valor ', v))
       .then(() => done());

});

/**
 * Fazer junto
 */
test('simple promise error catching chaining', (done) => {

    simplePromise()
       .then(v => console.log('Meu valor da funcao com erro ', v))
       .then(() => done())
       .catch(error => console.log('Erro: ',error))
       .then(() => done());
});

/**
 * Exercício 3
 * 
 * Refatorar o exercício dos callbacks (#2) para utilizar Promises conforme exemplo mostrado anteriormente
 */

test('refactoring callback exercise', () => {
    
    const funcaoPromisse = (url) => new Promise((resolve, reject) => {
        if (url === '/api/treinamento') {
            resolve('Sucesso');
        } else {
            reject('Error');
        }       
    });

    function chamarApiRest(apiRest) {

        return funcaoPromisse(apiRest)
               .then((result) => expect(result).to.equal('Sucesso'))
               .then(() => done());
    }

    chamarApiRest('/api/treinamento')  
   
});

/**
 * Exercício 4
 * 
 * Refatorar o exercício do encadeamento dos callbacks para utilizar o encadeamento das promises.
 */

test('refactoring callback chaining promises', () => {

    const funcaoPromisse = (url) => new Promise((resolve, reject) => {
        if (url === '/api/treinamento') {
            resolve('Sucesso');
        } else {
            reject('Error');
        }       
    });

    function chamarApiRest(apiRest) {

        return funcaoPromisse(apiRest)
               .then((result) => expect(result).to.equal('Sucesso'))
               .catch(funcaoPromisse('/api/treinamento'))
               .then((result) => expect(result).to.equal('Sucesso'))
               .then(() => done());
    }

    chamarApiRest('/api/treinamentoXXX')  

});
