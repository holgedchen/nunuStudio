"use strict";

function GeometryAsset(parent)
{
	Asset.call(this, parent);

	this.setIcon(Editor.filePath + "icons/misc/scene.png");
	
	var self = this;

	//Image
	this.image = document.createElement("img");
	this.image.style.position = "absolute";
	this.image.style.top = "5%";
	this.image.style.left = "17%";
	this.image.style.width = "66%";
	this.image.style.height = "66%";
	this.element.appendChild(this.image);

	//Context menu event
	this.element.oncontextmenu = function(event)
	{
		var context = new ContextMenu(DocumentBody);
		context.size.set(130, 20);
		context.position.set(event.clientX, event.clientY);
		
		context.addOption(Locale.rename, function()
		{
			Editor.addAction(new ChangeAction(self.asset, "name", Editor.prompt(Locale.rename, self.asset.name)));
		});
		
		context.addOption(Locale.delete, function()
		{
			Editor.program.removeFont(self.asset, Editor.defaultFont);
			Editor.updateObjectsViewsGUI();
		});

		context.addOption(Locale.copy, function()
		{
			try
			{
				Editor.clipboard.set(JSON.stringify(self.asset.toJSON()), "text");
			}
			catch(e){}
		});
		
		context.updateInterface();
	};

	//Drag start
	this.element.ondragstart = function(event)
	{
		//Insert into drag buffer
		if(self.asset !== null)
		{
			event.dataTransfer.setData("uuid", self.asset.uuid);
			DragBuffer.push(self.asset);
		}
	};

	//Drag end (called after of ondrop)
	this.element.ondragend = function(event)
	{
		DragBuffer.pop(self.asset.uuid);
	};
}

GeometryAsset.prototype = Object.create(Asset.prototype);

GeometryAsset.prototype.updateMetadata = function()
{
	if(this.asset !== null)
	{
		this.setText(this.asset.name);

		var image = this.image;

		GeometryRenderer.render(this.asset, function(url)
		{
			image.src = url;
		});
	}
};
