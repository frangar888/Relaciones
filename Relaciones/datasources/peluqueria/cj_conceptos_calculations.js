/**
 * @properties={type:8,typeid:36,uuid:"8DA33D0F-BF15-4A88-997D-02DD6D080B21"}
 * @AllowToRunInFind
 */
function calc_importe_egr_concepto()
{
	var importe = 0
	if(utils.hasRecords(cj_conceptos_to_cj_egresos)){
		cj_conceptos_to_cj_egresos.find()
		cj_conceptos_to_cj_egresos.cj_egr_fecha = utils.dateFormat(globals.vg_fecha_inicial,'yyyy-MM-dd') + ' 00:00:00...' + utils.dateFormat(globals.vg_fecha_final,'yyyy-MM-dd') + ' 23:59:59|yyyy-MM-dd HH:mm:ss'
		if(cj_conceptos_to_cj_egresos.search() != 0){
			for (var index = 1; index <= cj_conceptos_to_cj_egresos.getSize(); index++) {
				var record = cj_conceptos_to_cj_egresos.getRecord(index);
				importe += record.cj_egr_importe
			}
		}
	}
	return importe;
}

/**
 * @properties={type:8,typeid:36,uuid:"4B172725-7F74-492D-BE5F-B16F4974A44C"}
 * @AllowToRunInFind
 */
function calc_importe_ing_concepto()
{
	var importe = 0
	if(utils.hasRecords(cj_conceptos_to_cj_ingresos)){
		cj_conceptos_to_cj_ingresos.find()
		cj_conceptos_to_cj_ingresos.cj_ing_fecha = utils.dateFormat(globals.vg_fecha_inicial,'yyyy-MM-dd') + ' 00:00:00...' + utils.dateFormat(globals.vg_fecha_final,'yyyy-MM-dd') + ' 23:59:59|yyyy-MM-dd HH:mm:ss'
		if(cj_conceptos_to_cj_ingresos.search() != 0){
			for (var index = 1; index <= cj_conceptos_to_cj_ingresos.getSize(); index++) {
				var record = cj_conceptos_to_cj_ingresos.getRecord(index);
				importe += record.cj_ing_importe
			}
		}
	}
	return importe;
}
