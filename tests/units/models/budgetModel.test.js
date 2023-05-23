const model = require('../../../src/app/model/budgetModel');

const db = require('../../../src/app/config/database');
const { add, getAll, update, delete:deleteItem } = require('../../../src/app/model/budgetModel'); 

jest.mock('../../../src/app/config/database');

beforeEach(() => {
  // limpa todas as instâncias e chama a função mock
  jest.clearAllMocks();
});

describe('add function tests', () => {
    test('lança uma exceção quando algum campo requerido está faltando', async () => {
        await expect(add({})).rejects.toThrow('One or more required fields are missing. Required fields: category, description, amount, date');
      });
      
      test('lança uma exceção quando amount não é um número', async () => {
        await expect(add({ category: 'test', description: 'test', amount: 'not a number', date: '2023-05-23' })).rejects.toThrow('Amount must be a number');
      });
      
      test('lança uma exceção quando date não é uma string', async () => {
        await expect(add({ category: 'test', description: 'test', amount: 100, date: 123 })).rejects.toThrow('Date must be a string');
      });
      
      test('chama db.execute com os argumentos corretos quando os dados de entrada são válidos', async () => {
        const mockData = {
          category: 'test',
          description: 'test',
          amount: 100,
          date: '2023-05-23',
        };
      
        db.execute.mockResolvedValueOnce([{}]); // faz o mock da função execute para retornar um valor resolvido
      
        await add(mockData);
      
        expect(db.execute).toHaveBeenCalledWith(
          'INSERT INTO budget (category, description, amount, date) VALUES (?, ?, ?, ?)',
          [mockData.category, mockData.description, mockData.amount, mockData.date]
        );
      });
});

describe('getAll function tests', () => {
    test('chama db.execute com a query correta quando getAll é chamado', async () => {
        const mockData = [{ id: 1, category: 'test', description: 'test', amount: 100, date: '2023-05-23' }];
      
        db.execute.mockResolvedValueOnce([mockData]); // faz o mock da função execute para retornar um valor resolvido
      
        const result = await getAll();
      
        expect(db.execute).toHaveBeenCalledWith('SELECT * FROM budget');
        expect(result).toEqual(mockData);
      });
      
    test('retorna um array vazio e registra o erro quando ocorre um erro na consulta SQL', async () => {
    const mockError = new Error('Mock error');
    
    db.execute.mockRejectedValueOnce(mockError); // faz o mock da função execute para rejeitar com um erro
    
    console.log = jest.fn(); // faz o mock da função console.log para testar se ela é chamada
    
    const result = await getAll();
    
    expect(console.log).toHaveBeenCalledWith(mockError);
    expect(result).toEqual([]);
    });
});

describe('update function tests', () => {
    test('lança uma exceção quando o update não afeta nenhuma linha', async () => {
      db.execute.mockResolvedValueOnce([{ affectedRows: 0 }]); // faz o mock da função execute para retornar um valor resolvido
  
      const id = 1;
      const item = { category: 'test', description: 'test', amount: 100, date: '2023-05-23' };
  
      await expect(update(id, item)).rejects.toThrow(`Could not update record with id ${id}`);
    });
  
    test('chama db.execute com os argumentos corretos quando os dados de entrada são válidos', async () => {
      const id = 1;
      const item = { category: 'test', description: 'test', amount: 100, date: '2023-05-23' };
  
      db.execute.mockResolvedValueOnce([{ affectedRows: 1 }]); // faz o mock da função execute para retornar um valor resolvido
  
      await update(id, item);
  
      expect(db.execute).toHaveBeenCalledWith(
        'UPDATE budget SET category = ?, description = ?, amount = ?, date = ? WHERE id = ?',
        [item.category, item.description, item.amount, item.date, id]
      );
    });
  });
  
  describe('delete function tests', () => {
    test('lança uma exceção quando o delete não afeta nenhuma linha', async () => {
      db.execute.mockResolvedValueOnce([{ affectedRows: 0 }]); // faz o mock da função execute para retornar um valor resolvido
  
      const id = 1;
  
      await expect(deleteItem(id)).rejects.toThrow(`Unable to delete budget with id ${id}`);
    });
  
    test('chama db.execute com os argumentos corretos quando um id válido é fornecido', async () => {
      const id = 1;
  
      db.execute.mockResolvedValueOnce([{ affectedRows: 1 }]); // faz o mock da função execute para retornar um valor resolvido
  
      await deleteItem(id);
  
      expect(db.execute).toHaveBeenCalledWith('DELETE FROM budget WHERE id = ?', [id]);
    });
  });
  
