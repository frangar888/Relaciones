/**
 * @type {Number}
 *
 * @properties={typeid:35,uuid:"8EFD9FC0-8201-4E81-83A7-0B3ECE835CA4",variableType:4}
 */
var vg_rubro = null;

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"866389BE-92A9-4569-A35A-FB63A256DCA6",variableType:93}
 */
var vg_fecha_final = null;

/**
 * @type {Date}
 *
 * @properties={typeid:35,uuid:"856D485D-A2DA-405D-AEE7-4C5A0CA5326D",variableType:93}
 */
var vg_fecha_inicial = null;

/**
 * 
 * @param lnk_form
 * @param lnk_user
 *
 * @properties={typeid:24,uuid:"D789959E-B224-471C-A249-E8F6D0A96414"}
 * @AllowToRunInFind
 */
function obtenerPermisos(lnk_form, lnk_user){
	/** @type {JSFoundset<db:/peluqueria/cfg_permisos_2>}*/
	var fs_permisos = databaseManager.getFoundSet('peluqueria','cfg_permisos_2')
	fs_permisos.find()
	fs_permisos.user_id = lnk_user
	fs_permisos.form_id = lnk_form
	if(fs_permisos.search()){
		return fs_permisos
	}
	return null
	
}

/**
 * @AllowToRunInFind
 * 
 * @param lnk_form_padre
 * @param lnk_tipo_form
 * @param lnk_form
 * @param lnk_nombre_opcion
 *
 * @properties={typeid:24,uuid:"24DE5CEB-0DF9-4326-AF4D-B7A4E164D7E7"}
 */
function grabarFormUUID(lnk_form, lnk_nombre_opcion,lnk_tipo_form,lnk_form_padre){
	var ds = security.getElementUUIDs(lnk_form)
	var uuid = ds.getValue(1,2)
	/** @type {JSFoundset<db:/peluqueria/cfg_formularios>}*/
	var fs_forms = databaseManager.getFoundSet('peluqueria','cfg_formularios')
	fs_forms.find()
	fs_forms.form_uuid = uuid
	if(fs_forms.search() == 0){
		fs_forms.newRecord()
		fs_forms.form_nombre = lnk_form
		fs_forms.form_uuid = uuid
		fs_forms.opcion_nombre = lnk_nombre_opcion
		fs_forms.form_tipo = lnk_tipo_form
		fs_forms.form_padre_id = lnk_form_padre
		databaseManager.saveData(fs_forms)
	}else{
		fs_forms.opcion_nombre = lnk_nombre_opcion
		fs_forms.form_uuid = uuid
		fs_forms.form_tipo = lnk_tipo_form
		fs_forms.form_padre_id = lnk_form_padre
		databaseManager.saveData(fs_forms)
	}
}

/**
 * 
 * @param lnk_form_nombre
 *
 * @properties={typeid:24,uuid:"72005B40-3AFE-4127-A929-0C87345F4F81"}
 * @AllowToRunInFind
 */
function getFormID(lnk_form_nombre){
	var ds = security.getElementUUIDs(lnk_form_nombre)
	var uuid = ds.getValue(1,2)
	/** @type {JSFoundset<db:/peluqueria/cfg_formularios>}*/
	var fs_forms = databaseManager.getFoundSet('peluqueria','cfg_formularios')
	fs_forms.find()
	fs_forms.form_uuid = uuid
	if(fs_forms.search() != 0){
		return fs_forms.form_id
	}
	return null
}

/**
 * 
 * @param lnk_user
 * @param lnk_form
 * @param lnk_accion
 * @param lnk_nombre_form
 *
 * @properties={typeid:24,uuid:"1AA1626C-9D1C-4AD0-A866-17F42F697B18"}
 * @AllowToRunInFind
 */
function validarPermisos(lnk_user, lnk_form, lnk_accion,lnk_nombre_form){
	var form_nombre
	if(lnk_nombre_form == null){
		form_nombre = getFormNombre(lnk_form)
	}else{
		form_nombre = lnk_nombre_form
	}
	var lnk_permisos = obtenerPermisos(lnk_form,lnk_user)
	if(lnk_permisos != null){
		/** @type {JSFoundset<db:/peluqueria/cfg_permisos_2>}*/
		var fs_permisos = lnk_permisos
			switch(lnk_accion){
				case 0:
					break;
			case 1:
				if(fs_permisos.cfg_perm_grabar == 1){
					forms[form_nombre].elements['btn_grabar'].enabled = true
				}else{
					forms[form_nombre].elements['btn_grabar'].enabled = false
				}
				break;
			case 2:
				if(fs_permisos.cfg_perm_nuevo == 1){
					forms[form_nombre].elements['btn_nuevo'].enabled = true
				}else{
					forms[form_nombre].elements['btn_nuevo'].enabled = false
				}
				break;
			case 3:
				if(fs_permisos.cfg_perm_borrar == 1){
					forms[form_nombre].elements['btn_borrar'].enabled = true
				}else{
					forms[form_nombre].elements['btn_borrar'].enabled = false
				}
				break;
			case 4:
				if(fs_permisos.cfg_perm_print == 1){
					forms[form_nombre].elements['btn_imprimir'].enabled = true
				}else{
					forms[form_nombre].elements['btn_imprimir'].enabled = false
				}
			break;
			case 5:
				if(fs_permisos.cfg_perm_admin == 1){
					forms[form_nombre].elements['btn_admin'].enabled = true
				}else{
					forms[form_nombre].elements['btn_admin'].enabled = false
				}
			break;
				
			}
	}
}

/**
 * @AllowToRunInFind
 * 
 * 
 * @param lnk_user_id
 * @param lnk_form_id
 * @param lnk_form_nombre
 * @param lnk_botones
 *
 * @properties={typeid:24,uuid:"E13CDBAB-8ECA-4429-BDF2-7C9BD22C20D2"}
 */
function checkearAdmin(lnk_user_id, lnk_form_id, lnk_botones, lnk_form_nombre){
	var lnk_permisos = obtenerPermisos(lnk_form_id,lnk_user_id)
	if(lnk_permisos != null){
	/** @type {JSFoundset<db:/peluqueria/cfg_permisos_2>}*/
	var fs_permisos = lnk_permisos
	if(fs_permisos.cfg_perm_admin == 1){
		for (var index = 0; index < lnk_botones.length; index++) {
			forms[lnk_form_nombre].elements[lnk_botones[index]].enabled = true
		}
		return true
	}
	return false
	}
	return false
}

/**
 * 
 * @param lnk_user_id
 * @param lnk_form_id
 *
 *
 * @properties={typeid:24,uuid:"5083BC00-127E-4CE2-AF42-7531A2F03562"}
 * @AllowToRunInFind
 */
function validarLeer(lnk_user_id, lnk_form_id){
	var lnk_permisos = obtenerPermisos(lnk_form_id,lnk_user_id)
	if(lnk_permisos != null){
	/** @type {JSFoundset<db:/peluqueria/cfg_permisos_2>}*/
	var fs_permisos = lnk_permisos
	if(fs_permisos.cfg_perm_leer == 1){
		return true
	}
	return false
	/*
	fs_permisos.find()
	fs_permisos.form_id = lnk_form_id
	fs_permisos.permiso_tipo = 0
	if(fs_permisos.search() != 0){
		return true
	}
		return false
	}else{
		return false
		*/
	}
	return false
}

/**
 * @properties={typeid:24,uuid:"55225DA4-C8A1-4B08-948B-C3DF7AAFC888"}
 */
function grabarPermisosIniciales(lnk_user_id){
	/** @type {JSFoundset<db:/peluqueria/cfg_permisos_2>}*/
	var fs_permisos = databaseManager.getFoundSet('peluqueria','cfg_permisos')
	
	/** @type {JSFoundset<db:/peluqueria/cfg_formularios>}*/
	var fs_forms = databaseManager.getFoundSet('peluqueria','cfg_formularios')
	fs_forms.loadAllRecords()
	var cant = databaseManager.getFoundSetCount(fs_forms)
	for (var index = 1; index <= cant; index++) {
		var record = fs_forms.getRecord(index);
		fs_permisos.newRecord()
		fs_permisos.form_id = record.form_id
		fs_permisos.cfg_perm_leer = 1
		fs_permisos.user_id = lnk_user_id
		databaseManager.saveData(fs_permisos)
	}
	
}

/**
 * @AllowToRunInFind
 * 
 * 
 * @param lnk_form_id
 *
 * @properties={typeid:24,uuid:"C9C7CFEF-9998-4C90-A99A-AE54A5421A91"}
 */
function getFormNombre(lnk_form_id){
	/** @type {JSFoundset<db:/peluqueria/cfg_formularios>}*/
	var fs_forms = databaseManager.getFoundSet('peluqueria','cfg_formularios')
	fs_forms.find()
	fs_forms.form_id = lnk_form_id
	if(fs_forms.search() != 0){
		return fs_forms.form_nombre
	}
	return null
}

/**
 * 
 * 
 * @param lnk_user_id
 * @param lnk_form_id
 * 
 *
 * @properties={typeid:24,uuid:"0CB783D1-00C7-411F-A9A3-433171887CA5"}
 */
function validarPermisosPadre(lnk_form_id,lnk_user_id){
	var form_nombre = getFormNombre(lnk_form_id)
	var form_padre_id = getFormPadre(lnk_form_id)
	var lnk_permisos = obtenerPermisos(form_padre_id,lnk_user_id)
	if(lnk_permisos != null){
		/** @type {JSFoundset<db:/peluqueria/cfg_permisos_2>}*/
		var fs_permisos = lnk_permisos
		if(fs_permisos.cfg_perm_grabar == 1){
			forms[form_nombre].elements['btn_grabar'].enabled = true
		}else{
			forms[form_nombre].elements['btn_grabar'].enabled = false
		}
	}
}

/**
 * 
 * @param lnk_form_id
 *
 * @properties={typeid:24,uuid:"CCC01E0F-9538-4372-9328-96EE76F647DC"}
 * @AllowToRunInFind
 */
function getFormPadre(lnk_form_id){
	/** @type {JSFoundset<db:/peluqueria/cfg_formularios>}*/
	var fs_forms = databaseManager.getFoundSet('peluqueria','cfg_formularios')
	fs_forms.find()
	fs_forms.form_id = lnk_form_id
	if(fs_forms.search() != 0){
		return fs_forms.form_padre_id
	}
	return null
}

/**
 * TODO generated, please specify type and doc for the params
 * @param lnk_prd_id
 *
 * @properties={typeid:24,uuid:"CA14A48B-80F5-4573-AA37-0D8BCEB20FC6"}
 * @AllowToRunInFind
 */
function obtieneStock(lnk_prd_id){
	var cantPrd = 0
	/** @type {JSFoundset<db:/peluqueria/prd_movimientos>}*/
	var fs_prd_mov = databaseManager.getFoundSet('peluqueria','prd_movimientos')
	fs_prd_mov.loadAllRecords()
	fs_prd_mov.find()
	fs_prd_mov.prd_id = lnk_prd_id
	if(fs_prd_mov.search() != 0){
		var cant = databaseManager.getFoundSetCount(fs_prd_mov)
		for (var index = 1; index <= cant; index++) {
			var record = fs_prd_mov.getRecord(index);
			cantPrd += record.mov_ing
			cantPrd -= record.mov_egr
		}
		return cantPrd
	}else{
		return 0
	}
}
