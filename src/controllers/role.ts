
import { DEAFUL_PERMISSIONS } from '../codeUtils/globals';
import { Role } from '../database/models/role';
import { capture } from '../middlewares/errorhandler';
export const roleController = {

	//create a generic role
	createRol: capture(async (req, res)=>{
		const data = req.body;
		const exist = await Role.getRoleByName(data.name);
		if(exist) throw Error('Ya existe un rol con ese nombre');
		data.permissions = DEAFUL_PERMISSIONS;
		const result = await Role.create(data);
		res.send({ role: result });
	}),

	//get rol
	getRol: capture(async (req, res)=>{
		const result = await Role.find({}, { __V: 0 });
		res.send({ role: result });
	}),
	deleteRol: capture(async (req, res)=>{
		const { id } = req.params;
		const exist = await Role.getRoleById(id);
		if(!exist) throw Error('no existe ese rol');
		await Role.deleteRolById(id);
		res.send({});
	})
};