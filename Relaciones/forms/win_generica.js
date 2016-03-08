/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"A379BD9D-3465-49FD-83F6-4B4DF33FB5EA"}
 */
var vl_accion_si = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B7231CC3-5F59-455C-8186-40F019A358AD"}
 */
var vl_accion_no = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"B3083AB3-761E-4368-8130-6C46EF090483"}
 */
var vl_form_si = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"37207D3B-C9A2-46AB-98DB-177B4A718D25"}
 */
var vl_form_no = null;

/**
 * @type {String}
 *
 * @properties={typeid:35,uuid:"062C96ED-1477-4135-A5EE-C8E37BF839D7"}
 */
var vl_mensaje = null;

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"28211F7C-C286-401E-A630-033A6F28AF3C"}
 */
function onActionSi(event) {
	if(vl_form_si == null || vl_accion_si == null){
		application.getWindow("ventanaGenerica").hide()
		return
	}else{
		forms[vl_form_si][vl_accion_si]()
		//application.getWindow().hide()
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"EBCCE773-311B-4E98-8477-DC701BD720D9"}
 */
function onActionNo(event) {
	if(vl_form_no == null || vl_accion_no == null){
		application.getWindow("ventanaGenerica").hide()
		return
	}else{
		forms[vl_form_no][vl_accion_no]
		application.getWindow("ventanaGenerica").hide()
	}
}

/**
 * Perform the element default action.
 *
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"2B43A204-4453-4EA4-821B-EE8BD1A2F8D8"}
 */
function onActionOK(event) {
	application.getWindow("ventanaGenerica").hide()
	return
}

/**
 * Callback method for when form is shown.
 *
 * @param {Boolean} firstShow form is shown first time after load
 * @param {JSEvent} event the event that triggered the action
 *
 * @properties={typeid:24,uuid:"C026D020-8A7E-42F4-8986-58D5C42F3D1A"}
 */
function onShow(firstShow, event) {
	elements.texto.text = vl_mensaje
}
