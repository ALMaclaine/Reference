/** \file
*  Total Square Destruction
*/

string name = "Test";
string description = "TesterScript";

array<string> inputParametersNames = {"Bit Reduction"};
array<double> inputParameters(inputParametersNames.length);
array<double> inputParametersMin = {0};
array<double> inputParametersMax = {32};
array<double> inputParametersDefault = {0};

uint64 crush;
double rem;
double curSamp;

double left;
double right;

double bit_crush(double f) {
  return double(((f > 0.0) ? floor(f + 0.5) : ceil(f - 0.5)));
}

void processSample(array<double> &ioSample)
{
  int bit = 2.1;
  int max = pow(2, bit) - 1;
  ioSample[0] = bit_crush((ioSample[0] + 1.0) * max) / max - 1.0;
  ioSample[1] = bit_crush((ioSample[1] + 1.0) * max) / max - 1.0;
}



void updateInputParameters()
{

}
