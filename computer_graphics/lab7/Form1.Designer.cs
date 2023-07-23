
namespace lab7
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.openglControl1 = new SharpGL.OpenGLControl();
            this.DiffuseColor = new System.Windows.Forms.ComboBox();
            this.AmbientBox = new System.Windows.Forms.ComboBox();
            this.MaterialDiffuse = new System.Windows.Forms.ComboBox();
            this.MaterialSpecular = new System.Windows.Forms.ComboBox();
            this.LightningSpecular = new System.Windows.Forms.ComboBox();
            this.EmissionCheck = new System.Windows.Forms.CheckBox();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.LightSource = new System.Windows.Forms.ComboBox();
            this.trackBar1 = new System.Windows.Forms.TrackBar();
            this.label7 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.label9 = new System.Windows.Forms.Label();
            this.label10 = new System.Windows.Forms.Label();
            this.label11 = new System.Windows.Forms.Label();
            this.label12 = new System.Windows.Forms.Label();
            this.label13 = new System.Windows.Forms.Label();
            this.label14 = new System.Windows.Forms.Label();
            ((System.ComponentModel.ISupportInitialize)(this.openglControl1)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.trackBar1)).BeginInit();
            this.SuspendLayout();
            // 
            // openglControl1
            // 
            this.openglControl1.DrawFPS = false;
            this.openglControl1.Location = new System.Drawing.Point(13, 13);
            this.openglControl1.Margin = new System.Windows.Forms.Padding(4, 5, 4, 5);
            this.openglControl1.Name = "openglControl1";
            this.openglControl1.OpenGLVersion = SharpGL.Version.OpenGLVersion.OpenGL2_1;
            this.openglControl1.RenderContextType = SharpGL.RenderContextType.FBO;
            this.openglControl1.RenderTrigger = SharpGL.RenderTrigger.TimerBased;
            this.openglControl1.Size = new System.Drawing.Size(1319, 866);
            this.openglControl1.TabIndex = 0;
            this.openglControl1.OpenGLInitialized += new System.EventHandler(this.openglControl1_OpenGLInitialized);
            this.openglControl1.OpenGLDraw += new SharpGL.RenderEventHandler(this.openglControl1_OpenGLDraw);
            this.openglControl1.KeyDown += new System.Windows.Forms.KeyEventHandler(this.openglControl1_OpenGLKeyDown);
            this.openglControl1.MouseLeave += new System.EventHandler(this.openglControl1_MouseLeave);
            this.openglControl1.MouseMove += new System.Windows.Forms.MouseEventHandler(this.openglControl1_MouseMove);
            this.openglControl1.PreviewKeyDown += new System.Windows.Forms.PreviewKeyDownEventHandler(this.openglControl1_OpenGLPreviewKeyDown);
            // 
            // DiffuseColor
            // 
            this.DiffuseColor.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.DiffuseColor.FormattingEnabled = true;
            this.DiffuseColor.Items.AddRange(new object[] {
            "Red",
            "Orange",
            "Yellow",
            "Green",
            "Blue",
            "Purple",
            "White"});
            this.DiffuseColor.Location = new System.Drawing.Point(1339, 103);
            this.DiffuseColor.Name = "DiffuseColor";
            this.DiffuseColor.Size = new System.Drawing.Size(151, 28);
            this.DiffuseColor.TabIndex = 1;
            // 
            // AmbientBox
            // 
            this.AmbientBox.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.AmbientBox.FormattingEnabled = true;
            this.AmbientBox.Items.AddRange(new object[] {
            "default",
            "Red",
            "Orange",
            "Yellow",
            "Green",
            "Blue",
            "Purple"});
            this.AmbientBox.Location = new System.Drawing.Point(1339, 169);
            this.AmbientBox.Name = "AmbientBox";
            this.AmbientBox.Size = new System.Drawing.Size(151, 28);
            this.AmbientBox.TabIndex = 2;
            // 
            // MaterialDiffuse
            // 
            this.MaterialDiffuse.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.MaterialDiffuse.FormattingEnabled = true;
            this.MaterialDiffuse.Items.AddRange(new object[] {
            "default",
            "Red",
            "Orange",
            "Yellow",
            "Green",
            "Blue",
            "Purple"});
            this.MaterialDiffuse.Location = new System.Drawing.Point(1339, 241);
            this.MaterialDiffuse.Name = "MaterialDiffuse";
            this.MaterialDiffuse.Size = new System.Drawing.Size(151, 28);
            this.MaterialDiffuse.TabIndex = 3;
            // 
            // MaterialSpecular
            // 
            this.MaterialSpecular.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.MaterialSpecular.FormattingEnabled = true;
            this.MaterialSpecular.Items.AddRange(new object[] {
            "default",
            "Red",
            "Orange",
            "Yellow",
            "Green",
            "Blue",
            "Purple"});
            this.MaterialSpecular.Location = new System.Drawing.Point(1340, 308);
            this.MaterialSpecular.Name = "MaterialSpecular";
            this.MaterialSpecular.Size = new System.Drawing.Size(151, 28);
            this.MaterialSpecular.TabIndex = 4;
            // 
            // LightningSpecular
            // 
            this.LightningSpecular.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.LightningSpecular.FormattingEnabled = true;
            this.LightningSpecular.Items.AddRange(new object[] {
            "default",
            "Red",
            "Orange",
            "Yellow",
            "Green",
            "Blue",
            "Purple"});
            this.LightningSpecular.Location = new System.Drawing.Point(1340, 377);
            this.LightningSpecular.Name = "LightningSpecular";
            this.LightningSpecular.Size = new System.Drawing.Size(151, 28);
            this.LightningSpecular.TabIndex = 5;
            // 
            // EmissionCheck
            // 
            this.EmissionCheck.AutoSize = true;
            this.EmissionCheck.Location = new System.Drawing.Point(1340, 429);
            this.EmissionCheck.Name = "EmissionCheck";
            this.EmissionCheck.Size = new System.Drawing.Size(128, 24);
            this.EmissionCheck.TabIndex = 6;
            this.EmissionCheck.Text = "EmissionCheck";
            this.EmissionCheck.UseVisualStyleBackColor = true;
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(1339, 80);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(94, 20);
            this.label1.TabIndex = 7;
            this.label1.Text = "Diffuse color";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(1338, 146);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(66, 20);
            this.label2.TabIndex = 8;
            this.label2.Text = "Ambient";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(1339, 218);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(111, 20);
            this.label3.TabIndex = 9;
            this.label3.Text = "MaterialDiffuse";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(1339, 285);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(121, 20);
            this.label4.TabIndex = 10;
            this.label4.Text = "MaterialSpecular";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(1339, 352);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(128, 20);
            this.label5.TabIndex = 11;
            this.label5.Text = "LightningSpecular";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(1338, 13);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(75, 20);
            this.label6.TabIndex = 12;
            this.label6.Text = "Источник";
            // 
            // LightSource
            // 
            this.LightSource.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
            this.LightSource.FormattingEnabled = true;
            this.LightSource.Items.AddRange(new object[] {
            "Точечный",
            "Прожектор"});
            this.LightSource.Location = new System.Drawing.Point(1338, 36);
            this.LightSource.Name = "LightSource";
            this.LightSource.Size = new System.Drawing.Size(151, 28);
            this.LightSource.TabIndex = 13;
            // 
            // trackBar1
            // 
            this.trackBar1.Location = new System.Drawing.Point(1338, 511);
            this.trackBar1.Maximum = 128;
            this.trackBar1.Name = "trackBar1";
            this.trackBar1.Size = new System.Drawing.Size(130, 56);
            this.trackBar1.TabIndex = 14;
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(1340, 480);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(48, 20);
            this.label7.TabIndex = 15;
            this.label7.Text = "Блеск";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.BackColor = System.Drawing.Color.Black;
            this.label8.ForeColor = System.Drawing.Color.White;
            this.label8.Location = new System.Drawing.Point(22, 24);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(416, 20);
            this.label8.TabIndex = 16;
            this.label8.Text = "Мышка + стрелки + ctrl + space для перемещения камеры";
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.BackColor = System.Drawing.Color.Black;
            this.label9.ForeColor = System.Drawing.Color.White;
            this.label9.Location = new System.Drawing.Point(22, 52);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(200, 20);
            this.label9.TabIndex = 17;
            this.label9.Text = "1, 2, 3, 4 для смены объекта";
            // 
            // label10
            // 
            this.label10.AutoSize = true;
            this.label10.BackColor = System.Drawing.Color.Black;
            this.label10.ForeColor = System.Drawing.Color.White;
            this.label10.Location = new System.Drawing.Point(22, 79);
            this.label10.Name = "label10";
            this.label10.Size = new System.Drawing.Size(297, 20);
            this.label10.TabIndex = 18;
            this.label10.Text = "Q, E, W, A, S, D для перемещения объекта";
            // 
            // label11
            // 
            this.label11.AutoSize = true;
            this.label11.BackColor = System.Drawing.Color.Black;
            this.label11.ForeColor = System.Drawing.Color.White;
            this.label11.Location = new System.Drawing.Point(22, 106);
            this.label11.Name = "label11";
            this.label11.Size = new System.Drawing.Size(315, 20);
            this.label11.TabIndex = 19;
            this.label11.Text = "shift + Q, E, W, A, S, D для вращения объекта";
            // 
            // label12
            // 
            this.label12.AutoSize = true;
            this.label12.BackColor = System.Drawing.Color.Black;
            this.label12.ForeColor = System.Drawing.Color.White;
            this.label12.Location = new System.Drawing.Point(22, 133);
            this.label12.Name = "label12";
            this.label12.Size = new System.Drawing.Size(303, 20);
            this.label12.TabIndex = 20;
            this.label12.Text = "Z, X, R, F, T, G, Y, H для изменения размера";
            // 
            // label13
            // 
            this.label13.AutoSize = true;
            this.label13.BackColor = System.Drawing.Color.Black;
            this.label13.ForeColor = System.Drawing.Color.White;
            this.label13.Location = new System.Drawing.Point(22, 159);
            this.label13.Name = "label13";
            this.label13.Size = new System.Drawing.Size(285, 20);
            this.label13.TabIndex = 21;
            this.label13.Text = "O, P для изменения степени разбиения";
            // 
            // label14
            // 
            this.label14.AutoSize = true;
            this.label14.BackColor = System.Drawing.Color.Black;
            this.label14.ForeColor = System.Drawing.Color.White;
            this.label14.Location = new System.Drawing.Point(22, 185);
            this.label14.Name = "label14";
            this.label14.Size = new System.Drawing.Size(293, 20);
            this.label14.TabIndex = 22;
            this.label14.Text = "shift + стрелки для движения освещения";
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1516, 893);
            this.Controls.Add(this.label14);
            this.Controls.Add(this.label13);
            this.Controls.Add(this.label12);
            this.Controls.Add(this.label11);
            this.Controls.Add(this.label10);
            this.Controls.Add(this.label9);
            this.Controls.Add(this.label8);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.trackBar1);
            this.Controls.Add(this.LightSource);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.EmissionCheck);
            this.Controls.Add(this.LightningSpecular);
            this.Controls.Add(this.MaterialSpecular);
            this.Controls.Add(this.MaterialDiffuse);
            this.Controls.Add(this.AmbientBox);
            this.Controls.Add(this.DiffuseColor);
            this.Controls.Add(this.openglControl1);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.openglControl1)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.trackBar1)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private SharpGL.OpenGLControl openglControl1;
        private System.Windows.Forms.ComboBox DiffuseColor;
        private System.Windows.Forms.ComboBox AmbientBox;
        private System.Windows.Forms.ComboBox MaterialDiffuse;
        private System.Windows.Forms.ComboBox MaterialSpecular;
        private System.Windows.Forms.ComboBox LightningSpecular;
        private System.Windows.Forms.CheckBox EmissionCheck;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.ComboBox LightSource;
        private System.Windows.Forms.TrackBar trackBar1;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.Label label10;
        private System.Windows.Forms.Label label11;
        private System.Windows.Forms.Label label12;
        private System.Windows.Forms.Label label13;
        private System.Windows.Forms.Label label14;
    }
}

