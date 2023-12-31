const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

//Estos valores para las variables se podrian adaptar, pero para los fines de este trabajo estan hardcodeados.
const db_name = 'concesionarios';
const collection_name = 'concesionarios';
const db_uri = 'mongodb://127.0.0.1:27017';

//Esta función es vital, se encarga de sacar el objectId recibiendo un indice en caso de existir tal indice.
async function parseObjectId(id) {
  const conn = new MongoClient(`${db_uri}/${db_name}`);
  
  try {
    const collection = conn.db().collection(collection_name);
    
    //Pillamos la array de elementos que tenemos
    const results = await collection.find().toArray();
    
    //Validacion de la ID proporcionada
    //Si es un objectId, comprobamos que exista
    if (isNaN(id)) {
      id = new ObjectId(id);
      const existsId = await collection.findOne({ _id: id });
      //Condicion ternaria para comprobar si devolver un mensaje de error o la id encontrada.
      return existsId === null ? { message: 'No existe la Id de Concesionario que has introducido.' } : existsId._id;
    }
    //Comprobamos que el indice no sea mayor a la cantidad de elementos
    else if (results.length < parseInt(id) + 1) {
      //En caso de que lo sea, devolvemos mensaje de error
      return Promise.resolve({ message: 'Concesionario no encontrado' });
    } else {
      //En caso de que nada de lo anterior ocurra, devolvemos la id del indice encontrado.
      return results[parseInt(id)]._id;
    }
  } catch (err) {
    console.log(err);
  } finally {
    conn.close();
  }
}

//Función para encontrar, por defecto busca la primera que aparezca
async function dbFindConcesionario(search = {}) {
  const conn = new MongoClient(`${db_uri}/${db_name}`);

  //Este codigo se va a repetir en todas las funciones
  try {
    //Sacamos la colección
    const collection = conn.db().collection(`${collection_name}`);
    //Aquí esta la query para encontrar uno
    const results = await collection.findOne(search);

    return results;
  } catch (err) {
    console.error(err);
  } finally {
    conn.close();
  }
}

async function dbFindConcesionarios(search = {}) {
  //Este codigo ya esta explicado en la primera función
  const conn = new MongoClient(`${db_uri}/${db_name}`);
  try {
    const collection = conn.db().collection(`${collection_name}`);
    //Hacemos un find con el parametro search como busqueda y hacemos .toArray()
    const results = await collection.find(search).toArray();

    //Devolvemos
    return results;
  } catch (err) {
    console.error(err);
  } finally {
    conn.close();
  }
}

async function dbInsertConcesionario(item) {
  //Este codigo ya esta explicado en la primera función
  const conn = new MongoClient(`${db_uri}/${db_name}`);

  try {
    const collection = conn.db().collection(`${collection_name}`);
    //Insert con el item que se pase por parametro
    const results = await collection.insertOne(item);
    //Lo devolvemos
    return results;
  } catch (err) {
    console.error(err);
  } finally {
    conn.close();
  }
}

async function dbDeleteConcesionario(id) {
  //Este codigo ya esta explicado en la primera función
  const conn = new MongoClient(`${db_uri}/${db_name}`);
  try {
    const collection = conn.db().collection(`${collection_name}`);
    //Encuentra un elemento por id y lo elimina
    const results = await collection.findOneAndDelete({ _id: id });

    //Lo devolvemos
    return results;
  } catch (err) {
    console.error(err);
  } finally {
    conn.close();
  }
}

//Esta función es de las mas importantes, ya que se encarga de todos los puts.
async function dbUpdateConcesionario(id, nombre, direccion, coches) {
  //Este codigo ya esta explicado en la primera función
  const conn = new MongoClient(`${db_uri}/${db_name}`);
  try {
    const collection = conn.db().collection(collection_name);

    //Hacemos un update a un elemento que tenga la misma objectId que la recibida.
    const results = await collection.updateOne(
      { _id: id },
      {
        //Le damos estos valores
        $set: {
          nombre: nombre,
          direccion: direccion,
          coches: coches,
        },
      }
    );
      
    //Devolvemos los resultados
    return results;
  } catch (err) {
    console.log('Ha ocurrido un error: ',err.message);
  } finally {
    conn.close();
  }
}


async function dbFindCoches(id) {
  
  const conn = new MongoClient(`${db_uri}/${db_name}`);
  try {
    const collection = conn.db().collection(collection_name);

    const filter = { _id: id };

    //Hacemos un update a un elemento que tenga la misma objectId que la recibida.
    const result = await collection.findOne(filter);
    //Devolvemos los resultados
    return result.coches;
  } catch (err) {
    console.log('Ha ocurrido un error: ',err.message);
    return {'title':'error','error_message':`${err.message}`};
  } finally {
    conn.close();
  }
}


async function dbFindCoche(id, cocheId) {
  
  const conn = new MongoClient(`${db_uri}/${db_name}`);
  try {
    const collection = conn.db().collection(collection_name);

    const filter = { _id: id };

    const projection = {
      _id: 0, 
      coche : {$arrayElemAt: ['$coches', cocheId] }  
    };

    // Hacemos un update a un elemento que tenga la misma objectId que la recibida.
    const result = await collection.findOne(filter, { projection });
    // Devolvemos los resultados
    return result.coche;
  } catch (err) {
    console.log('Ha ocurrido un error: ',err.message);
    return {'title':'error','error_message':`${err.message}`};
  } finally {
    conn.close();
  }
}

// Hace un paticion a la base de datos para borrar un coche.
async function dbDeleteCoche(id, cocheId) {
  const conn = new MongoClient(`${db_uri}/${db_name}`);
  try {

    const collection = conn.db().collection(collection_name);
    const filter = { _id: id };

    const cochesActualizados = await collection.findOne(filter);
    cochesActualizados.coches.splice(cocheId,1);

    const update = {$set : {coches : cochesActualizados.coches}};

    const result = await collection.updateOne(filter, update);

    return result;

  } catch (err) {
    console.log(err);
  } finally {
    conn.close();
  }
}

// Inserta el coche a la base de datos
async function dbInsertCoche(id, newCoche) {
  const conn = new MongoClient(`${db_uri}/${db_name}`);
  try {

    const collection = conn.db().collection(collection_name);
    const filter = { _id: id };

    const update = {
      $push: { coches: newCoche }
    };

    //Hacemos un update a un elemento que tenga la misma objectId que la recibida.
    const result = await collection.updateOne(filter, update, {upsert:true});

    //Devolvemos los resultados
    return result.coche;
  } catch (err) {
    console.log('Ha ocurrido un error: ',err.message);
  } finally {
    conn.close();
  }

}

// Actualizamos un coche
async function dbUpdateCoche(id, cocheId, coche) {
  
  const conn = new MongoClient(`${db_uri}/${db_name}`);
  try {

    const collection = conn.db().collection(collection_name);
    const filter = { _id: id };
    
    const update = {
      $set: { [`coches.${cocheId}`]: coche }
    };

    //Hacemos un update a un elemento que tenga la misma objectId que la recibida.
    const result = await collection.updateOne(filter, update ,{upsert:true});

    //Devolvemos los resultados
    return result.coche;
  } catch (err) {
    console.log('Ha ocurrido un error: ',err.message);
  } finally {
    conn.close();
  }
}

//Exportamos las funciones para que se puedan importar desde el otro archivo
module.exports = {
  parseObjectId,
  dbFindConcesionario,
  dbInsertConcesionario,
  dbUpdateConcesionario,
  dbFindConcesionarios,
  dbDeleteConcesionario,
  dbFindCoche,
  dbFindCoches,
  dbInsertCoche,
  dbUpdateCoche,
  dbDeleteCoche
};
