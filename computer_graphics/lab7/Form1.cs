using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using SharpGL;

namespace lab7
{
    public partial class Form1 : Form
    {
        private int sides = 96;
        private int fin_ind = 2;
        private int[] fineness = { 6, 8, 12, 16, 24, 32 };

        private double camera_x = -10.0;
        private double camera_y = 15.0;
        private double radius = -30.0;
        private double camera_z;
        private double center_x = 0.0;
        private double center_y = 0.0;
        private double center_z = 0.0;

        private int curShape = 0;
        private List<Point3D> positions;
        private List<Point3D> angles;
        private List<Point3D> scales;

        List<Point3D> cylinder;
        List<Point3D> cone;
        List<Point3D> hyperboloid;
        List<Point3D> paraboloid;

        ColorRGB active_line_color;
        ColorRGB inactive_line_color;
        ColorRGB active_surface_color;
        ColorRGB inactive_surface_color;

        public int light_type;
        public float[] light_position = { -1f, 5f, -1f, 1f };


        public struct Point3D
        {
            public double x, y, z;
            public Point3D(double X, double Y, double Z)
            {
                x = X;
                y = Y;
                z = Z;
            }
        }
        public struct ColorRGB
        {
            public double r, g, b;
            public ColorRGB(double R, double G, double B)
            {
                r = R;
                g = G;
                b = B;
            }
        }

        public Form1()
        {
            InitializeComponent();
            camera_z = radius;

            positions = new List<Point3D>();

            Point3D cylinderPosition = new Point3D(-3.0f, 0.0f, -3.0f);
            Point3D conePosition = new Point3D(-2.0f, 0.0f, -6.0f);
            Point3D hyperboloidPosition = new Point3D(-5.0f, 2.0f, -4.0f);
            Point3D paraboloidPosition = new Point3D(0.0f, 0.0f, -4.0f);

            positions.Add(cylinderPosition);
            positions.Add(conePosition);
            positions.Add(hyperboloidPosition);
            positions.Add(paraboloidPosition);

            angles = new List<Point3D>();

            Point3D cylinderAngles = new Point3D(0.0, 0.0, 0.0);
            Point3D coneAngles = new Point3D(0.0, 0.0, 0.0);
            Point3D hyperboloidAngles = new Point3D(0.0, 0.0, 0.0);
            Point3D paraboloidAngles = new Point3D(0.0, 0.0, 0.0);
            angles.Add(cylinderAngles);
            angles.Add(coneAngles);
            angles.Add(hyperboloidAngles);
            angles.Add(paraboloidAngles);

            scales = new List<Point3D>();
            Point3D cylinderScale = new Point3D(1.0f, 1.0f, 1.0f);
            Point3D coneScale = new Point3D(1.0f, 1.0f, 1.0f);
            Point3D hyperboloidScale = new Point3D(1.0f, 1.0f, 1.0f);
            Point3D paraboloidScale = new Point3D(1.0f, 1.0f, 1.0f);
            scales.Add(cylinderScale);
            scales.Add(coneScale);
            scales.Add(hyperboloidScale);
            scales.Add(paraboloidScale);

            cylinder = new List<Point3D>();
            cone = new List<Point3D>();
            hyperboloid = new List<Point3D>();
            paraboloid = new List<Point3D>();

            active_line_color = new ColorRGB(1.0f, 1.0f, 0.8f);
            inactive_line_color = new ColorRGB(0.7f, 0.7f, 0.8f);
            active_surface_color = new ColorRGB(0.8f, 0.4f, 0.8f);
            inactive_surface_color = new ColorRGB(0.5f, 0.5f, 0.5f);

            light_type = 0;
            LightSource.SelectedItem = "Точечный";
            DiffuseColor.SelectedItem = "White";
            AmbientBox.SelectedItem = "default";
            MaterialDiffuse.SelectedItem = "default";
            MaterialSpecular.SelectedItem = "default";
            LightningSpecular.SelectedItem = "default";
            
        }

        private void DrawAxes()
        {
            OpenGL gl = openglControl1.OpenGL;
            gl.Color(1.0f, 0.3f, 0.3f);
            gl.Begin(OpenGL.GL_LINES);
            gl.Vertex(-200, 0, 0);
            gl.Vertex(200, 0, 0);

            gl.Color(0.3f, 1.0f, 0.3f);
            gl.Vertex(0, -200, 0);
            gl.Vertex(0, 200, 0);

            gl.Color(0.3f, 0.3f, 1.0f);
            gl.Vertex(0, 0, -200);
            gl.Vertex(0, 0, 200);
            gl.End();

            /*gl.Color(1.0f, 1.0f, 0.0f);
            gl.Begin(OpenGL.GL_POLYGON);
            gl.Vertex(200, 0, 200);
            gl.Vertex(-200, 0, 200);
            gl.Vertex(-200, 0, -200);
            gl.Vertex(200, 0, -200);
            gl.End();*/
        }
        private void DrawShape(int index)
        {
            OpenGL gl = openglControl1.OpenGL;
            gl.PushMatrix();
            gl.Translate(positions[index].x, positions[index].y, positions[index].z);
            gl.Rotate(angles[index].z, 0.0f, 0.0f, 1.0f);
            gl.Rotate(angles[index].x, 1.0f, 0.0f, 0.0f);
            gl.Rotate(angles[index].y, 0.0f, 1.0f, 0.0f);
            gl.Scale(scales[index].x, scales[index].y, scales[index].z);
            gl.Translate(-positions[index].x, -positions[index].y, -positions[index].z);
            if (index == 0)
                drawCylinder(positions[0].x, positions[0].y, positions[0].z);
            else if (index == 1)
                drawCone(positions[1].x, positions[1].y, positions[1].z);
            else if (index == 2)
                drawHyperboloid(positions[2].x, positions[2].y, positions[2].z);
            else if (index == 3)
                drawParaboloid(positions[3].x, positions[3].y, positions[3].z);
            gl.PopMatrix();
        }

        private void openglControl1_OpenGLDraw(object sender, RenderEventArgs args)
        {
            OpenGL gl = openglControl1.OpenGL;

            gl.MatrixMode(OpenGL.GL_PROJECTION);
            gl.LoadIdentity();
            double aspect = openglControl1.Height != 0 ? openglControl1.Width / openglControl1.Height : 1;

            gl.Perspective(30.0, aspect, 1, 200.0);

            gl.MatrixMode(OpenGL.GL_MODELVIEW);
            gl.LoadIdentity();

            gl.LookAt(camera_x, camera_y, camera_z,
                       center_x, center_y, center_z,
                       0, 1, 0);

            gl.Enable(OpenGL.GL_DEPTH_TEST);
            gl.Enable(OpenGL.GL_LIGHTING);
            gl.Enable(OpenGL.GL_LIGHT0);
            gl.Enable(OpenGL.GL_LIGHT1);
            gl.Enable(OpenGL.GL_COLOR_MATERIAL);
            gl.Enable(OpenGL.GL_NORMALIZE);
            gl.LightModel(OpenGL.GL_LIGHT_MODEL_TWO_SIDE, OpenGL.GL_TRUE);

            gl.Clear(OpenGL.GL_COLOR_BUFFER_BIT | OpenGL.GL_DEPTH_BUFFER_BIT);

            float[] diffuseColor = { 0f, 0f, 0f, 1f };
            switch (DiffuseColor.SelectedItem.ToString())
            {
                case "Red":
                    diffuseColor[0] = 1f;
                    break;
                case "Orange":
                    diffuseColor[0] = 1f;
                    diffuseColor[1] = 0.65f;
                    break;
                case "Yellow":
                    diffuseColor[0] = 1f;
                    diffuseColor[1] = 1f;
                    break;
                case "Green":
                    diffuseColor[1] = 1f;
                    break;
                case "Blue":
                    diffuseColor[2] = 1f;
                    break;
                case "Purple":
                    diffuseColor[0] = 1f;
                    diffuseColor[1] = 0.2f;
                    diffuseColor[2] = 0.9f;
                    break;
                case "White":
                    diffuseColor[0] = 1f;
                    diffuseColor[1] = 1f;
                    diffuseColor[2] = 1f;
                    break;
                default:
                    diffuseColor[0] = 1f;
                    diffuseColor[1] = 1f;
                    diffuseColor[2] = 1f;
                    break;
            }

            float[] ambientColor = { 0.2f, 0.2f, 0.2f, 1.0f };
            switch (AmbientBox.SelectedItem.ToString())
            {
                case "Red":
                    ambientColor[0] = 1f;
                    break;
                case "Orange":
                    ambientColor[0] = 1f;
                    ambientColor[1] = 0.65f;
                    break;
                case "Yellow":
                    ambientColor[0] = 1f;
                    ambientColor[1] = 1f;
                    break;
                case "Green":
                    ambientColor[1] = 1f;
                    break;
                case "Blue":
                    ambientColor[2] = 1f;
                    break;
                case "Purple":
                    ambientColor[0] = 1f;
                    ambientColor[1] = 0.2f;
                    ambientColor[2] = 0.9f;
                    break;
                case "White":
                    ambientColor[0] = 1f;
                    ambientColor[1] = 1f;
                    ambientColor[2] = 1f;
                    break;
            }
           
            float[] materialDiffuse = { 0f, 0f, 0f, 1f };
            switch (MaterialDiffuse.SelectedItem.ToString())
            {
                case "Red":
                    ambientColor[0] = 1f;
                    break;
                case "Orange":
                    ambientColor[0] = 1f;
                    ambientColor[1] = 0.65f;
                    break;
                case "Yellow":
                    ambientColor[0] = 1f;
                    ambientColor[1] = 1f;
                    break;
                case "Green":
                    ambientColor[1] = 1f;
                    break;
                case "Blue":
                    ambientColor[2] = 1f;
                    break;
                case "Purple":
                    materialDiffuse[0] = 1f;
                    materialDiffuse[1] = 0.2f;
                    materialDiffuse[2] = 0.9f;
                    break;
                case "White":
                    materialDiffuse[0] = 1f;
                    materialDiffuse[1] = 1f;
                    materialDiffuse[2] = 1f;
                    break;
            }
            
            float[] materialSpecular = { 0f, 0f, 0f, 1f };
            switch (MaterialSpecular.SelectedItem.ToString())
            {
                case "Red":
                    materialSpecular[0] = 1f;
                    break;
                case "Orange":
                    materialSpecular[0] = 1f;
                    materialSpecular[1] = 0.65f;
                    break;
                case "Yellow":
                    materialSpecular[0] = 1f;
                    materialSpecular[1] = 1f;
                    break;
                case "Green":
                    materialSpecular[1] = 1f;
                    break;
                case "Blue":
                    materialSpecular[2] = 1f;
                    break;
                case "Purple":
                    materialSpecular[0] = 1f;
                    materialSpecular[1] = 0.2f;
                    materialSpecular[2] = 0.9f;
                    break;
                case "White":
                    materialSpecular[0] = 1f;
                    materialSpecular[1] = 1f;
                    materialSpecular[2] = 1f;
                    break;
            }

            float[] lightningSpecular = { 1f, 1f, 1f, 1f };
            switch (LightningSpecular.SelectedItem.ToString())
            {
                case "Red":
                    lightningSpecular[0] = 1f;
                    break;
                case "Orange":
                    lightningSpecular[0] = 1f;
                    lightningSpecular[1] = 0.65f;
                    break;
                case "Yellow":
                    lightningSpecular[0] = 1f;
                    lightningSpecular[1] = 1f;
                    break;
                case "Green":
                    lightningSpecular[0] = 0.1f;
                    lightningSpecular[1] = 1f;
                    lightningSpecular[2] = 0.1f;
                    break;
                case "Blue":
                    lightningSpecular[0] = 0.1f;
                    lightningSpecular[1] = 0.2f;
                    lightningSpecular[2] = 1f;
                    break;
                case "Purple":
                    lightningSpecular[0] = 1f;
                    lightningSpecular[1] = 0.2f;
                    lightningSpecular[2] = 0.9f;
                    break;
                case "White":
                    lightningSpecular[0] = 1f;
                    lightningSpecular[1] = 1f;
                    lightningSpecular[2] = 1f;
                    break;
            }

            if (EmissionCheck.Checked)
            {
                gl.Material(OpenGL.GL_FRONT_AND_BACK, OpenGL.GL_EMISSION, new float[] { 0.5f, 0.2f, 1f, 1f });
            }
            else
            {
                gl.Material(OpenGL.GL_FRONT_AND_BACK, OpenGL.GL_EMISSION, new float[] { 0.0f, 0.0f, 0.0f, 1.0f });
            }

            gl.Material(OpenGL.GL_FRONT_AND_BACK, OpenGL.GL_AMBIENT_AND_DIFFUSE, materialDiffuse);
            gl.Material(OpenGL.GL_FRONT_AND_BACK, OpenGL.GL_SPECULAR, materialSpecular);
            gl.Material(OpenGL.GL_FRONT_AND_BACK, OpenGL.GL_SHININESS, trackBar1.Value);

            gl.FrontFace(OpenGL.GL_CCW);

            if (LightSource.SelectedItem.ToString() == "Точечный")
            {
                gl.Disable(OpenGL.GL_LIGHT1);
                gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_POSITION, light_position);
                gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_DIFFUSE, new float[] { 1f, 1f, 1f, 1f });
                gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_CONSTANT_ATTENUATION, 0.0f);
                gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_LINEAR_ATTENUATION, 0.2f);
                gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_QUADRATIC_ATTENUATION, 0.1f);
                gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_AMBIENT, ambientColor);
                gl.Light(OpenGL.GL_LIGHT0, OpenGL.GL_SPECULAR, lightningSpecular);
            }
            else
            {
                gl.Disable(OpenGL.GL_LIGHT0);
                float[] light0_spot_direction = { 0.0f, -1.0f, 0.0f };
                gl.Light(OpenGL.GL_LIGHT1, OpenGL.GL_POSITION, light_position);
                gl.Light(OpenGL.GL_LIGHT1, OpenGL.GL_DIFFUSE, diffuseColor);
                gl.Light(OpenGL.GL_LIGHT1, OpenGL.GL_SPOT_CUTOFF, 30);
                gl.Light(OpenGL.GL_LIGHT1, OpenGL.GL_SPOT_DIRECTION, light0_spot_direction);
                gl.Light(OpenGL.GL_LIGHT1, OpenGL.GL_AMBIENT, ambientColor);
                gl.Light(OpenGL.GL_LIGHT1, OpenGL.GL_SPECULAR, lightningSpecular);
            }


            gl.PushMatrix();
            gl.PointSize(10.0f);
            gl.Color(1.0f, 1.0f, 0.5f);
            gl.Begin(OpenGL.GL_POINTS);
            gl.Vertex(light_position[0], light_position[1], light_position[2]);
            gl.End();
            gl.PopMatrix();

            gl.LineWidth(2.0f);

            DrawAxes();

            for (int i = 0; i < 4; i++)
                DrawShape(i);
            
        }

        private void openglControl1_OpenGLKeyDown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.D1)
                curShape = 0;

            else if (e.KeyCode == Keys.D2)
                curShape = 1;

            else if (e.KeyCode == Keys.D3)
                curShape = 2;

            else if (e.KeyCode == Keys.D4)
                curShape = 3;

            if (e.Shift)
            {
                if (e.KeyCode == Keys.A)
                {
                    Point3D temp = angles[curShape];
                    temp.z -= 10.0f;
                    angles[curShape] = temp;
                }
                else if (e.KeyCode == Keys.D)
                {
                    Point3D temp = angles[curShape];
                    temp.z += 10.0f;
                    angles[curShape] = temp;
                }
                else if (e.KeyCode == Keys.W)
                {
                    Point3D temp = angles[curShape];
                    temp.x += 10.0f;
                    angles[curShape] = temp;
                }
                else if (e.KeyCode == Keys.S)
                {
                    Point3D temp = angles[curShape];
                    temp.x -= 10.0f;
                    angles[curShape] = temp;
                }
                else if (e.KeyCode == Keys.Q)
                {
                    Point3D temp = angles[curShape];
                    temp.y -= 10.0f;
                    angles[curShape] = temp;
                }
                else if (e.KeyCode == Keys.E)
                {
                    Point3D temp = angles[curShape];
                    temp.y += 10.0f;
                    angles[curShape] = temp;
                }
                else if (e.KeyCode == Keys.Up)
                {
                    light_position[2]++;
                }
                else if (e.KeyCode == Keys.Down)
                {
                    light_position[2]--;
                }
                else if (e.KeyCode == Keys.Left)
                {
                    light_position[0]++;
                }
                else if (e.KeyCode == Keys.Right)
                {
                    light_position[0]--;
                }
                else if (e.KeyCode == Keys.Space)
                {
                    light_position[1]++;
                }
                else if (e.Control)
                {
                    light_position[1]--;
                }
            }
            else
            {
                if (e.KeyCode == Keys.A)
                {
                    Point3D temp = positions[curShape];
                    temp.x += 1;
                    positions[curShape] = temp;
                }
                else if (e.KeyCode == Keys.D)
                {
                    Point3D temp = positions[curShape];
                    temp.x -= 1;
                    positions[curShape] = temp;
                }
                else if (e.KeyCode == Keys.W)
                {
                    Point3D temp = positions[curShape];
                    temp.z += 1;
                    positions[curShape] = temp;
                }
                else if (e.KeyCode == Keys.S)
                {
                    Point3D temp = positions[curShape];
                    temp.z -= 1;
                    positions[curShape] = temp;
                }
                else if (e.KeyCode == Keys.E)
                {
                    Point3D temp = positions[curShape];
                    temp.y += 1;
                    positions[curShape] = temp;
                }
                else if (e.KeyCode == Keys.Q)
                {
                    Point3D temp = positions[curShape];
                    temp.y -= 1;
                    positions[curShape] = temp;
                }
                else if (e.KeyCode == Keys.F)
                {
                    Point3D temp = scales[curShape];
                    temp.x -= 0.1;
                    scales[curShape] = temp;
                }
                else if (e.KeyCode == Keys.R)
                {
                    Point3D temp = scales[curShape];
                    temp.x += 0.1;
                    scales[curShape] = temp;
                }
                else if (e.KeyCode == Keys.G)
                {
                    Point3D temp = scales[curShape];
                    temp.z -= 0.1;
                    scales[curShape] = temp;
                }
                else if (e.KeyCode == Keys.T)
                {
                    Point3D temp = scales[curShape];
                    temp.z += 0.1;
                    scales[curShape] = temp;
                }
                else if (e.KeyCode == Keys.H)
                {
                    Point3D temp = scales[curShape];
                    temp.y -= 0.1;
                    scales[curShape] = temp;
                }
                else if (e.KeyCode == Keys.Y)
                {
                    Point3D temp = scales[curShape];
                    temp.y += 0.1;
                    scales[curShape] = temp;
                }
                else if (e.KeyCode == Keys.X)
                {
                    Point3D temp = scales[curShape];
                    temp.x += 0.1;
                    temp.y += 0.1;
                    temp.z += 0.1;
                    scales[curShape] = temp;
                }
                else if (e.KeyCode == Keys.Z)
                {
                    Point3D temp = scales[curShape];
                    temp.x -= 0.1;
                    temp.y -= 0.1;
                    temp.z -= 0.1;
                    scales[curShape] = temp;
                }
                else if (e.KeyCode == Keys.P)
                {
                    fin_ind++;
                    if (fin_ind >= fineness.Length)
                        fin_ind = 0;
                }
                else if (e.KeyCode == Keys.O)
                {
                    fin_ind--;
                    if (fin_ind == -1)
                        fin_ind = fineness.Length - 1;
                }
                else if (e.KeyCode == Keys.Space)
                {
                    camera_y++;
                    center_y++;
                }
                else if (e.Control)
                {
                    camera_y--;
                    center_y--;
                }
                else if (e.KeyCode == Keys.Up)
                {
                    camera_z++;
                    center_z++;
                    Console.WriteLine(camera_x);
                    Console.WriteLine(camera_z);
                }
                else if (e.KeyCode == Keys.Down)
                {
                    camera_z--;
                    center_z--;
                    Console.WriteLine(camera_x);
                    Console.WriteLine(camera_z);
                }
                else if (e.KeyCode == Keys.Left)
                {
                    camera_x++;
                    center_x++;
                    Console.WriteLine(camera_x);
                    Console.WriteLine(camera_z);
                }
                else if (e.KeyCode == Keys.Right)
                {
                    camera_x--;
                    center_x--;
                    Console.WriteLine(camera_x);
                    Console.WriteLine(camera_z);
                }
            }
        }

        private void openglControl1_OpenGLPreviewKeyDown(object sender, PreviewKeyDownEventArgs e)
        {
            if (e.KeyCode == Keys.Up)
            {
                e.IsInputKey = true;
            }
            if (e.KeyCode == Keys.Down)
            {
                e.IsInputKey = true;
            }
            if (e.KeyCode == Keys.Left)
            {
                e.IsInputKey = true;
            }
            if (e.KeyCode == Keys.Right)
            {
                e.IsInputKey = true;
            }
        }

        private void drawCylinder(double cent_x, double cent_y, double cent_z)
        {
            cylinder.Clear();
            for (int a = 0; a < sides; a++)
            {
                double heading = a * 3.1415926535897932384626433832795 / (sides / 2);
                Point3D temp1 = new Point3D(cent_x + Math.Sin(heading) * 0.8, cent_y + 0, cent_z + Math.Cos(heading) * 0.8);
                cylinder.Add(temp1);
            }
            for (int a = 0; a < sides; a++)
            {
                double heading = a * 3.1415926535897932384626433832795 / (sides / 2);

                double shift = Math.Cos(heading);
                Point3D temp1 = new Point3D(cent_x + Math.Sin(heading) * 0.8, cent_y + 5 + shift, cent_z + Math.Cos(heading) * 0.8);
                cylinder.Add(temp1);
            }
            OpenGL gl = openglControl1.OpenGL;

            gl.LineWidth(2.0f);

            if (curShape == 0)
                gl.Color(active_line_color.r, active_line_color.g, active_line_color.b);

            else
                gl.Color(inactive_line_color.r, inactive_line_color.g, inactive_line_color.b);
            gl.FrontFace(OpenGL.GL_CW);
            gl.Begin(OpenGL.GL_LINE_LOOP);
            for (int i = 0; i < sides; i++)
            {
                gl.Vertex(cylinder[i].x, cylinder[i].y, cylinder[i].z);
            }
            gl.End();
            gl.FrontFace(OpenGL.GL_CCW);
            gl.Begin(OpenGL.GL_LINE_LOOP);
            for (int i = 0; i < sides; i++)
            {
                gl.Vertex(cylinder[i + sides].x, cylinder[i + sides].y, cylinder[i + sides].z);
            }
            gl.End();


            List<int> coord = new List<int>();
            for (int i = 0; i < fineness[fin_ind]; i++)
            {
                coord.Add(i * sides / fineness[fin_ind]);
            }

            gl.Begin(OpenGL.GL_LINES);
            for (int i = 0; i < coord.Count(); i++)
            {
                gl.Vertex(cylinder[coord[i]].x, cylinder[coord[i]].y, cylinder[coord[i]].z);
                gl.Vertex(cylinder[coord[i] + sides].x, cylinder[coord[i] + sides].y, cylinder[coord[i] + sides].z);
            }
            gl.End();

            if (curShape == 0)
                gl.Color(active_surface_color.r, active_surface_color.g, active_surface_color.b);

            else
                gl.Color(inactive_surface_color.r, inactive_surface_color.g, inactive_surface_color.b);

            gl.Begin(OpenGL.GL_POLYGON);
            for (int i = 0; i < sides; i++)
            {
                gl.Vertex(cylinder[i].x, cylinder[i].y, cylinder[i].z);
            }
            gl.End();
            gl.Begin(OpenGL.GL_POLYGON);
            for (int i = 0; i < sides; i++)
            {
                gl.Vertex(cylinder[i + sides].x, cylinder[i + sides].y, cylinder[i + sides].z);
            }
            gl.End();
            for (int i = 0; i < sides - 1; i++)
            {
                gl.Begin(OpenGL.GL_POLYGON);
                gl.Vertex(cylinder[i].x, cylinder[i].y, cylinder[i].z);
                gl.Vertex(cylinder[i + 1].x, cylinder[i + 1].y, cylinder[i + 1].z);
                gl.Vertex(cylinder[i + sides + 1].x, cylinder[i + sides + 1].y, cylinder[i + sides + 1].z);
                gl.Vertex(cylinder[i + sides].x, cylinder[i + sides].y, cylinder[i + sides].z);
                gl.End();
            }
            gl.Begin(OpenGL.GL_POLYGON);
            gl.Vertex(cylinder[sides - 1].x, cylinder[sides - 1].y, cylinder[sides - 1].z);
            gl.Vertex(cylinder[0].x, cylinder[0].y, cylinder[0].z);
            gl.Vertex(cylinder[sides].x, cylinder[sides].y, cylinder[sides].z);
            gl.Vertex(cylinder[sides * 2 - 1].x, cylinder[sides * 2 - 1].y, cylinder[sides * 2 - 1].z);
            gl.End();
        }

        private void drawCone(double cent_x, double cent_y, double cent_z)
        {
            cone.Clear();
            for (int a = 0; a < sides; a++)
            {
                double heading = a * 3.1415926535897932384626433832795 / (sides / 2);
                Point3D temp1 = new Point3D(cent_x + Math.Sin(heading), cent_y + 0, cent_z + Math.Cos(heading));
                cone.Add(temp1);
            }
            for (int a = 0; a < sides; a++)
            {
                double heading = a * 3.1415926535897932384626433832795 / (sides / 2);

                double shift = Math.Cos(heading);
                Point3D temp1 = new Point3D(cent_x + Math.Sin(heading) * 0.6f, cent_y + 4 + 0.8 * shift, cent_z + Math.Cos(heading) * 0.6f);
                cone.Add(temp1);
            }
            OpenGL gl = openglControl1.OpenGL;

            gl.LineWidth(2.0f);
            if (curShape == 1)
                gl.Color(active_line_color.r, active_line_color.g, active_line_color.b);

            else
                gl.Color(inactive_line_color.r, inactive_line_color.g, inactive_line_color.b);

            gl.Begin(OpenGL.GL_LINE_LOOP);
            for (int i = 0; i < sides; i++)
            {
                gl.Vertex(cone[i].x, cone[i].y, cone[i].z);
            }
            gl.End();
            gl.Begin(OpenGL.GL_LINE_LOOP);
            for (int i = 0; i < sides; i++)
            {
                gl.Vertex(cone[i + sides].x, cone[i + sides].y, cone[i + sides].z);
            }
            gl.End();

            List<int> coord = new List<int>(); //вынести в общие
            for (int i = 0; i < fineness[fin_ind]; i++)
            {
                coord.Add(i * sides / fineness[fin_ind]);
            }
            gl.Begin(OpenGL.GL_LINES);
            for (int i = 0; i < coord.Count(); i++)
            {
                gl.Vertex(cone[coord[i]].x, cone[coord[i]].y, cone[coord[i]].z);
                gl.Vertex(cone[coord[i] + sides].x, cone[coord[i] + sides].y, cone[coord[i] + sides].z);
            }
            gl.End();

            if (curShape == 1)
                gl.Color(active_surface_color.r, active_surface_color.g, active_surface_color.b);

            else
                gl.Color(inactive_surface_color.r, inactive_surface_color.g, inactive_surface_color.b);

            gl.Begin(OpenGL.GL_POLYGON);
            for (int i = 0; i < sides; i++)
            {
                gl.Vertex(cone[i].x, cone[i].y, cone[i].z);
            }
            gl.End();
            gl.Begin(OpenGL.GL_POLYGON);
            for (int i = 0; i < sides; i++)
            {
                gl.Vertex(cone[i + sides].x, cone[i + sides].y, cone[i + sides].z);
            }
            gl.End();
            for (int i = 0; i < sides - 1; i++)
            {
                gl.Begin(OpenGL.GL_POLYGON);
                gl.Vertex(cone[i].x, cone[i].y, cone[i].z);
                gl.Vertex(cone[i + 1].x, cone[i + 1].y, cone[i + 1].z);
                gl.Vertex(cone[i + sides + 1].x, cone[i + sides + 1].y, cone[i + sides + 1].z);
                gl.Vertex(cone[i + sides].x, cone[i + sides].y, cone[i + sides].z);
                gl.End();
            }
            gl.Begin(OpenGL.GL_POLYGON);
            gl.Vertex(cone[sides - 1].x, cone[sides - 1].y, cone[sides - 1].z);
            gl.Vertex(cone[0].x, cone[0].y, cone[0].z);
            gl.Vertex(cone[sides].x, cone[sides].y, cone[sides].z);
            gl.Vertex(cone[sides * 2 - 1].x, cone[sides * 2 - 1].y, cone[sides * 2 - 1].z);
            gl.End();
        }

        private void drawHyperboloid(double cent_x, double cent_y, double cent_z)
        {
            hyperboloid.Clear();
            float depth = 2;
            for (int u = 0; u < fineness[fin_ind]; u++)
            {
                for (int v = 0; v < fineness[fin_ind]; v++)
                {
                    double u_normal = ((depth * 2 * u / (fineness[fin_ind] - 1)) - depth) / 1.0f;
                    double v_normal = 2 * Math.PI * v / (fineness[fin_ind]);

                    double x = cent_x + 0.5 * Math.Sqrt(1 + u_normal * u_normal) * Math.Cos(v_normal);
                    double y = cent_y + 1 * u_normal;
                    double z = cent_z + 0.5 * Math.Sqrt(1 + u_normal * u_normal) * Math.Sin(v_normal);

                    Point3D temp1 = new Point3D(x, y, z);
                    hyperboloid.Add(temp1);
                }
            }

            OpenGL gl = openglControl1.OpenGL;
            gl.FrontFace(OpenGL.GL_CW);
            if (curShape == 2)
                gl.Color(active_line_color.r, active_line_color.g, active_line_color.b);

            else
                gl.Color(inactive_line_color.r, inactive_line_color.g, inactive_line_color.b);

            for (int f = 0; f < fineness[fin_ind]; f++)
            {
                gl.Begin(OpenGL.GL_LINE_LOOP);
                for (int i = 0; i < fineness[fin_ind]; i++)
                {
                    gl.Vertex(hyperboloid[i + fineness[fin_ind] * f].x, hyperboloid[i + fineness[fin_ind] * f].y, hyperboloid[i + fineness[fin_ind] * f].z);
                }
                gl.End();
            }

            for (int f = 0; f < fineness[fin_ind]; f++)
            {
                gl.Begin(OpenGL.GL_LINE_STRIP);
                for (int i = 0; i < fineness[fin_ind]; i++)
                {
                    gl.Vertex(hyperboloid[i * fineness[fin_ind] + f].x, hyperboloid[i * fineness[fin_ind] + f].y, hyperboloid[i * fineness[fin_ind] + f].z);
                }
                gl.End();
            }

            if (curShape == 2)
                gl.Color(active_surface_color.r, active_surface_color.g, active_surface_color.b);

            else
                gl.Color(inactive_surface_color.r, inactive_surface_color.g, inactive_surface_color.b);
            gl.FrontFace(OpenGL.GL_CCW);
            gl.Begin(OpenGL.GL_POLYGON);
            for (int f = 0; f < fineness[fin_ind]; f++)
            {
                gl.Vertex(hyperboloid[f].x, hyperboloid[f].y, hyperboloid[f].z);
            }
            gl.End();
            gl.FrontFace(OpenGL.GL_CW);
            gl.Begin(OpenGL.GL_POLYGON);
            for (int f = 0; f < fineness[fin_ind]; f++)
            {
                gl.Vertex(hyperboloid[(fineness[fin_ind] - 1) * fineness[fin_ind] + f].x, hyperboloid[(fineness[fin_ind] - 1) * fineness[fin_ind] + f].y, hyperboloid[(fineness[fin_ind] - 1) * fineness[fin_ind] + f].z);
            }
            gl.End();

            for (int f = 0; f < fineness[fin_ind] - 1; f++)
            {
                for (int i = 0; i < fineness[fin_ind] - 1; i++)
                {
                    gl.Begin(OpenGL.GL_POLYGON);
                    gl.Vertex(hyperboloid[f * fineness[fin_ind] + i].x, hyperboloid[f * fineness[fin_ind] + i].y, hyperboloid[f * fineness[fin_ind] + i].z);
                    gl.Vertex(hyperboloid[f * fineness[fin_ind] + (i + 1)].x, hyperboloid[f * fineness[fin_ind] + (i + 1)].y, hyperboloid[f * fineness[fin_ind] + (i + 1)].z);
                    gl.Vertex(hyperboloid[f * fineness[fin_ind] + (i + fineness[fin_ind] + 1)].x, hyperboloid[f * fineness[fin_ind] + (i + fineness[fin_ind] + 1)].y, hyperboloid[f * fineness[fin_ind] + (i + fineness[fin_ind] + 1)].z);
                    gl.Vertex(hyperboloid[f * fineness[fin_ind] + (i + fineness[fin_ind])].x, hyperboloid[f * fineness[fin_ind] + (i + fineness[fin_ind])].y, hyperboloid[f * fineness[fin_ind] + (i + fineness[fin_ind])].z);
                    gl.End();
                }
            }
            for (int f = 0; f < fineness[fin_ind] - 1; f++)
            {
                gl.Begin(OpenGL.GL_POLYGON);
                gl.Vertex(hyperboloid[f * fineness[fin_ind] + fineness[fin_ind] - 1].x, hyperboloid[f * fineness[fin_ind] + fineness[fin_ind] - 1].y, hyperboloid[f * fineness[fin_ind] + fineness[fin_ind] - 1].z);
                gl.Vertex(hyperboloid[f * fineness[fin_ind]].x, hyperboloid[f * fineness[fin_ind]].y, hyperboloid[f * fineness[fin_ind]].z);
                gl.Vertex(hyperboloid[f * fineness[fin_ind] + fineness[fin_ind]].x, hyperboloid[f * fineness[fin_ind] + fineness[fin_ind]].y, hyperboloid[f * fineness[fin_ind] + fineness[fin_ind]].z);
                gl.Vertex(hyperboloid[f * fineness[fin_ind] + 2 * fineness[fin_ind] - 1].x, hyperboloid[f * fineness[fin_ind] + 2 * fineness[fin_ind] - 1].y, hyperboloid[f * fineness[fin_ind] + 2 * fineness[fin_ind] - 1].z);
                gl.End();
            }
        }

        private void drawParaboloid(double cent_x, double cent_y, double cent_z)
        {
            paraboloid.Clear();
            for (int i = 0; i < fineness[fin_ind]; i++)
            {
                for (int k = 0; k < fineness[fin_ind]; k++)
                {
                    double heading = k * 3.1415926535897932384626433832795 / (fineness[fin_ind] / 2);
                    double x = cent_x + 0.6 * Math.Sin(heading) * (2 * Convert.ToDouble(i) / Convert.ToDouble(fineness[fin_ind] - 1));
                    double y = cent_y + 1.5 * Math.Pow(2 * Convert.ToDouble(i) / Convert.ToDouble(fineness[fin_ind] - 1), 2);
                    double z = cent_z + 0.6 * Math.Cos(heading) * (2 * Convert.ToDouble(i) / Convert.ToDouble(fineness[fin_ind] - 1));
                    Point3D temp1 = new Point3D(x, y, z);
                    paraboloid.Add(temp1);
                }
            }
            OpenGL gl = openglControl1.OpenGL;
            if (curShape == 3)
                gl.Color(active_line_color.r, active_line_color.g, active_line_color.b);

            else
                gl.Color(inactive_line_color.r, inactive_line_color.g, inactive_line_color.b);

            gl.FrontFace(OpenGL.GL_CCW);
            for (int f = 0; f < fineness[fin_ind]; f++)
            {
                gl.Begin(OpenGL.GL_LINE_LOOP);
                for (int i = 0; i < fineness[fin_ind]; i++)
                {
                    gl.Vertex(paraboloid[i + fineness[fin_ind] * f].x, paraboloid[i + fineness[fin_ind] * f].y, paraboloid[i + fineness[fin_ind] * f].z);
                }
                gl.End();
            }
            for (int f = 0; f < fineness[fin_ind]; f++)
            {
                gl.Begin(OpenGL.GL_LINE_STRIP);
                for (int i = 0; i < fineness[fin_ind]; i++)
                {
                    gl.Vertex(paraboloid[i * fineness[fin_ind] + f].x, paraboloid[i * fineness[fin_ind] + f].y, paraboloid[i * fineness[fin_ind] + f].z);
                }
                gl.End();
            }
            if (curShape == 3)
                gl.Color(active_surface_color.r, active_surface_color.g, active_surface_color.b);

            else
                gl.Color(inactive_surface_color.r, inactive_surface_color.g, inactive_surface_color.b);

            gl.Begin(OpenGL.GL_POLYGON);
            for (int f = 0; f < fineness[fin_ind]; f++)
            {
                gl.Vertex(paraboloid[f].x, paraboloid[f].y, paraboloid[f].z);
            }
            gl.End();
            gl.Begin(OpenGL.GL_POLYGON);
            for (int f = 0; f < fineness[fin_ind]; f++)
            {
                gl.Vertex(paraboloid[(fineness[fin_ind] - 1) * fineness[fin_ind] + f].x, paraboloid[(fineness[fin_ind] - 1) * fineness[fin_ind] + f].y, paraboloid[(fineness[fin_ind] - 1) * fineness[fin_ind] + f].z);
            }
            gl.End();

            for (int f = 0; f < fineness[fin_ind] - 1; f++)
            {
                for (int i = 0; i < fineness[fin_ind] - 1; i++)
                {
                    gl.Begin(OpenGL.GL_POLYGON);
                    gl.Vertex(paraboloid[f * fineness[fin_ind] + i].x, paraboloid[f * fineness[fin_ind] + i].y, paraboloid[f * fineness[fin_ind] + i].z);
                    gl.Vertex(paraboloid[f * fineness[fin_ind] + (i + 1)].x, paraboloid[f * fineness[fin_ind] + (i + 1)].y, paraboloid[f * fineness[fin_ind] + (i + 1)].z);
                    gl.Vertex(paraboloid[f * fineness[fin_ind] + (i + fineness[fin_ind] + 1)].x, paraboloid[f * fineness[fin_ind] + (i + fineness[fin_ind] + 1)].y, paraboloid[f * fineness[fin_ind] + (i + fineness[fin_ind] + 1)].z);
                    gl.Vertex(paraboloid[f * fineness[fin_ind] + (i + fineness[fin_ind])].x, paraboloid[f * fineness[fin_ind] + (i + fineness[fin_ind])].y, paraboloid[f * fineness[fin_ind] + (i + fineness[fin_ind])].z);
                    gl.End();
                }
            }
            for (int f = 0; f < fineness[fin_ind] - 1; f++)
            {
                gl.Begin(OpenGL.GL_POLYGON);
                gl.Vertex(paraboloid[f * fineness[fin_ind] + fineness[fin_ind] - 1].x, paraboloid[f * fineness[fin_ind] + fineness[fin_ind] - 1].y, paraboloid[f * fineness[fin_ind] + fineness[fin_ind] - 1].z);
                gl.Vertex(paraboloid[f * fineness[fin_ind]].x, paraboloid[f * fineness[fin_ind]].y, paraboloid[f * fineness[fin_ind]].z);
                gl.Vertex(paraboloid[f * fineness[fin_ind] + fineness[fin_ind]].x, paraboloid[f * fineness[fin_ind] + fineness[fin_ind]].y, paraboloid[f * fineness[fin_ind] + fineness[fin_ind]].z);
                gl.Vertex(paraboloid[f * fineness[fin_ind] + 2 * fineness[fin_ind] - 1].x, paraboloid[f * fineness[fin_ind] + 2 * fineness[fin_ind] - 1].y, paraboloid[f * fineness[fin_ind] + 2 * fineness[fin_ind] - 1].z);
                gl.End();
            }
        }

        private void openglControl1_OpenGLInitialized(object sender, EventArgs e)
        {
            OpenGL gl = openglControl1.OpenGL;

            gl.ClearColor(0.2f, 0.2f, 0.2f, 0);
            //OpenGL gl = openGLControl.OpenGL;

        }

        private void openglControl1_MouseMove(object sender, MouseEventArgs e)
        {
            double HeightAspect = (double)(e.Y) / (double)openglControl1.Height;
            center_y = camera_y - 1.5f * radius * Math.Tan(Math.PI * (0.5 - HeightAspect));

            double WidthAspect = (double)(e.X) / (double)openglControl1.Width;

            double xzAngle = Math.PI * (1 - WidthAspect);

            center_x = camera_x + 1.5f * radius * Math.Cos(xzAngle);
            //center_z = camera_z + radius * Math.Sin(xzAngle);
        }

        private void openglControl1_MouseLeave(object sender, EventArgs e)
        {
            center_x = 0.0;
            center_y = 0.0;
            center_z = 0.0;
        }

        private void Form1_Load(object sender, EventArgs e)
        {

        }
    }
}
