"use strict";

function PlaneGeometryForm(form, object)
{
	this.form = form;
	this.object = object;
	
	var self = this;

	var updateGeometry = function()
	{
		self.updateGeometry();
	};

	this.form.addText("Plane Geometry");
	this.form.nextRow();
	
	//Size
	this.form.addText("Size");
	this.form.addText("W", true);
	this.width = new NumberBox(this.form);
	this.width.size.set(40, 18);
	this.width.setStep(0.1);
	this.width.setOnChange(updateGeometry);
	this.form.add(this.width);

	this.form.addText("H", true);
	this.height = new NumberBox(this.form);
	this.height.size.set(40, 18);
	this.height.setStep(0.1);
	this.height.setOnChange(updateGeometry);
	this.form.add(this.height);
	this.form.nextRow();
	
	//Segments
	this.form.addText("Segments");
	this.form.addText("W", true);
	this.widthSegments = new NumberBox(this.form);
	this.widthSegments.size.set(40, 18);
	this.widthSegments.setStep(1);
	this.widthSegments.setOnChange(updateGeometry);
	this.form.add(this.widthSegments);

	this.form.addText("H", true);
	this.heightSegments = new NumberBox(this.form);
	this.heightSegments.size.set(40, 18);
	this.heightSegments.setStep(1);
	this.heightSegments.setOnChange(updateGeometry);
	this.form.add(this.heightSegments);
	this.form.nextRow();

	//Buffer
	this.buffer = new CheckBox(this.form);
	this.form.addText("Buffered");
	this.buffer.size.set(18, 18);
	this.buffer.setOnChange(updateGeometry);
	this.form.add(this.buffer);
	this.form.nextRow();
}

PlaneGeometryForm.prototype.updateGeometry = function()
{
	this.object.geometry.dispose();
	var GeometryConstructor = this.buffer.getValue() ? THREE.PlaneBufferGeometry : THREE.PlaneGeometry;
	Editor.addAction(new ChangeAction(this.object, "geometry", new GeometryConstructor(this.width.getValue(), this.height.getValue(), this.widthSegments.getValue(), this.heightSegments.getValue())));
};

PlaneGeometryForm.prototype.updateValues = function()
{
	this.width.setValue(this.object.geometry.parameters.width || 1);
	this.height.setValue(this.object.geometry.parameters.height || 1);
	this.widthSegments.setValue(this.object.geometry.parameters.widthSegments || 1);
	this.heightSegments.setValue(this.object.geometry.parameters.heightSegments || 1);
	this.buffer.setValue(this.object.geometry instanceof THREE.BufferGeometry);
};